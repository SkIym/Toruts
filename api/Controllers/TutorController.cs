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
        [Route("search/{query}")]
        public async Task<IActionResult> Search([FromRoute] string query)
        {
            var tutors = await _context.Tutor.ToListAsync();
            query = query.ToLower();
            if (tutors == null)
            {
                return NotFound("No Tutors Available");
            }

            // Get the user keys
            foreach (var tutor in tutors)
            {
                tutor.User = _context.User
                    .Where(u => u.Id == tutor.UserId)
                    .First();
            }

            List<Tutor> searchedTutors = new List<Tutor>();

            foreach (var tutor in tutors)
            {
                if (tutor == null)
                {
                    continue;
                }

                var fullname = (tutor.User.FirstName + " " + tutor.User.LastName).ToLower();
                if (fullname.Contains(query) || tutor.EducAttainment.Contains(query))
                {
                    searchedTutors.Add(tutor);
                }
            }
            return Ok(searchedTutors);
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
                PortraitUrl = tutorDto.PortraitUrl,
                Status = tutorDto.Status
            };

            await _context.Tutor.AddAsync(tutor);
            user.Tutor = tutor;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = tutor.Id }, tutor.ToTutorDto());

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

            var tutor = await _context.Tutor.FirstOrDefaultAsync(s => s.UserId == user.Id);
            if (tutor == null)
            {
                return NotFound($"User '{username}' does not have a tutor profile");
            }

            tutor.EducAttainment = updateDto.EducAttainment;
            tutor.LearningMode = updateDto.LearningMode;
            tutor.Venue = updateDto.Venue;
            tutor.Price = updateDto.Price;
            tutor.AreasOfExpertise = updateDto.AreasOfExpertise;
            tutor.TutoringExperiences = updateDto.TutoringExperiences;
            tutor.Availability = updateDto.Availability;
            tutor.PortraitUrl = updateDto.PortraitUrl;
            tutor.Status = updateDto.Status;

            await _context.SaveChangesAsync();

            return Ok(tutor.ToTutorDto());

        }
    }
}
