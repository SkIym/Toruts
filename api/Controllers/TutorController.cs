using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Dtos.Record;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Mappers;
using Microsoft.EntityFrameworkCore;
using api.Enums;
using api.Service;
using Supabase.Storage;
using System.Security.Cryptography.X509Certificates;

namespace api.Controllers
{
    [ApiController]
    [Route("api/tutors")]
    public class TutorController : ControllerBase
    {
        // UserManager for managing user-related operations
        private readonly UserManager<User> _userManager;

        // ApplicationDBContext for interacting with the database
        private readonly ApplicationDBContext _context;

        // Constructor to inject dependencies
        public TutorController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET endpoind to get all tutors
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tutorList = await _context.Tutor.ToListAsync();
            var tutors = tutorList.Select(t => t.ToTutorDto());

            return Ok(tutors);
        }

        // GET endpoint to search tutors

        // GET endpoint to filter tutors

        // GET endpoint to get tutor by username
        [HttpGet]
        [Route("get/{username}")]
        public async Task<IActionResult> GetByUsername([FromRoute] string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            // If user not found, return 404 Not Found
            if (user == null)
            {
                return NotFound(username);
            }

            var tutor = await _context.Tutor.FirstOrDefaultAsync(t => t.UserId == user.Id);

            // If user not found, return 404 Not Found
            if (tutor == null)
            {
                return NotFound();
            }

            return Ok(tutor.ToTutorDto());
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchWithQuery(string? query, int? minPrice, int? maxPrice)
        {
            // build query first
            var tutorsQuery = _context.Tutor
                                .Include(t => t.User)
                                .AsQueryable();

            tutorsQuery = tutorsQuery.Where(t => t.Status == Status.Active);

            if (minPrice.HasValue)
            {
                tutorsQuery = tutorsQuery.Where(t => t.Price >= minPrice.Value);
            }
            if (maxPrice.HasValue)
            {
                tutorsQuery = tutorsQuery.Where(t => t.Price <= maxPrice.Value);
            }

            if (!string.IsNullOrWhiteSpace(query))
            {
                query = query.ToLower();
                var tokens = query.Split(' ');

                tutorsQuery = tutorsQuery.Where(t => (
                    t.User.FirstName + " " + t.User.LastName).ToLower().Contains(query) ||
                    t.EducAttainment.ToLower().Contains(query) ||
                    t.AreasOfExpertise == null ? true : t.AreasOfExpertise.Intersect(tokens).Count() > 0
                );
            }

            // then execute
            var tutors = await tutorsQuery
                    .Select(t => t.ToTutorResultDto())
                    .ToListAsync();
                   
            return Ok(tutors);
        }

        // GET endpoint to get tutor by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var tutor = await _context.Tutor.FindAsync(id);

            // If user not found, return 404 Not Found
            if (tutor == null)
            {
                return NotFound();
            }

            return Ok(tutor.ToTutorDto());
        }

        // POST endpoint to create tutors
        [HttpPost]
        [Route("create/{username}")]
        public async Task<IActionResult> TutorCreate([FromRoute] string username, [FromBody] CreateTutorRequestDto tutorDto)
        {

            // Validate the model state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find username
            var user = await _userManager.FindByNameAsync(username);

            // If user not found, return 404 Not Found
            if (user == null)
            {
                return NotFound($"User '{username}' does not exist.");
            }

            // Check if the user already has a tutor account
            var existingTutor = await _context.Tutor.FirstOrDefaultAsync(t => t.UserId == user.Id);
            if (existingTutor != null)
            {
                return BadRequest("User already has a tutor account.");
            }

            var tutor = new Tutor
            {
                UserId = user.Id,
                User = user,
                EducAttainment = tutorDto.EducAttainment,
                LearningMode = tutorDto.LearningMode,
                Venue = tutorDto.Venue,
                Price = tutorDto.Price,
                AreasOfExpertise = tutorDto.AreasOfExpertise,
                TutoringExperiences = tutorDto.TutoringExperiences,
                Availability = tutorDto.Availability,
                PortraitUrl = null,
                Status = tutorDto.Status
            };
           
            await _context.Tutor.AddAsync(tutor);
            user.Tutor = tutor;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = tutor.Id }, tutor.ToTutorDto());

        }

        [HttpPost]
        [Route("upload/portrait/{id}")]
        public async Task<IActionResult> Upload([FromRoute] int id, [FromForm] IFormFile portrait, Supabase.Client client)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var tutor = await _context.Tutor.FirstAsync(t => t.Id == id);
            using var memoryStream = new MemoryStream();
            await portrait.CopyToAsync(memoryStream);
            var lastIndexOfDot = portrait.FileName.LastIndexOf('.');
            string ext = portrait.FileName[(lastIndexOfDot + 1)..];

            if (tutor.PortraitUrl == null)
            {
                
                await client.Storage.From("profile-pictures").Upload(
                    memoryStream.ToArray(),
                    $"tutor-{tutor.Id}.{ext}");
            } 
            else 
            {
                Console.WriteLine("updating");
                var dot = tutor.PortraitUrl.LastIndexOf('.');
                string prevExt = tutor.PortraitUrl[(dot + 1)..];
                await client.Storage.From("profile-pictures").Remove(
                    $"tutor-{tutor.Id}.{prevExt}");
                await client.Storage.From("profile-pictures").Upload(
                    memoryStream.ToArray(),
                    $"tutor-{tutor.Id}.{ext}");
            }
                
            tutor.PortraitUrl = client.Storage.From("profile-pictures").GetPublicUrl($"tutor-{tutor.Id}.{ext}");
            await _context.SaveChangesAsync();
            return Ok(tutor.PortraitUrl);
            
        }

        [HttpPut("update/{username}")]
        public async Task<IActionResult> Update([FromRoute] string username, [FromBody] UpdateTutorDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound($"User '{username}' does not exist");
            }

            var tutor = await _context.Tutor.FirstOrDefaultAsync(t => t.UserId == user.Id);
            if (tutor == null)
            {
                return NotFound($"User '{username}' does not have a tutor profile");
            }

            _context.Entry(tutor).CurrentValues.SetValues(updateDto);
            _context.Entry(tutor).State = EntityState.Modified;
            _context.Entry(tutor).Property(x => x.PortraitUrl).IsModified = false;

            await _context.SaveChangesAsync();

            return Ok(tutor.ToTutorDto());

        }
    }
}
