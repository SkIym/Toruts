using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Match;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/matches")]
    public class MatchController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly ApplicationDBContext _context;

        public MatchController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize]
        [HttpPost]
        [Route("create/{username}")]
        public async Task<IActionResult> CreateMatch([FromRoute] string username, [FromBody] CreateMatchRequestDto matchDto)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound($"User '{username}' does not exist.");
            }

            var student = await _context.Student.FirstOrDefaultAsync(s => s.UserId == user.Id);
            if (student == null)
            {
                return NotFound($"Student does not exist.");
            }

            var tutor = await _context.Tutor.FirstOrDefaultAsync(t => t.Id == matchDto.TutorId);
            if (tutor == null)
            {
                return NotFound($"Tutor does not exist.");
            }

            var match = new Match
            {
                TutorId = matchDto.TutorId,
                Tutor = tutor,
                StudentId = student.Id,
                Student = student,
                Subject = matchDto.Subject,
                Price = matchDto.Price
            };

            

            tutor.Matches ??= new List<Match>();
            tutor.Matches.Add(match);
            
            student.Matches ??= new List<Match>();
            student.Matches.Add(match);
            
            await _context.Match.AddAsync(match);
            await _context.SaveChangesAsync();

            var studentWithMatches = await _context.Student
                    .Include(s => s.Matches)
                        .ThenInclude(m => m.Tutor)
                            .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(s => s.Id == student.Id);

            return Ok(studentWithMatches.ToStudentDto());

        }

        [Authorize]
        [HttpGet]
        [Route("student/{id}")]
        public async Task<IActionResult> GetTutors([FromRoute] int id)
        {
            var student = await _context.Student.FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return NotFound();
            }

            var tutorList = _context.Match
                                .Where(m => m.StudentId == id)
                                .Include(m => m.Tutor)
                                .ThenInclude(t => t.User)
                                .Select(m => new {
                                    m.Tutor.PortraitUrl,
                                    m.Tutor.User.FirstName,
                                    m.Tutor.User.LastName,
                                    m.Tutor.Id
                                })
                                .ToListAsync();
            return Ok(tutorList);
        }

        [Authorize]
        [HttpGet]
        [Route("tutor/{id}")]
        public async Task<IActionResult> GetTutees([FromRoute] int id)
        {
            var tutor = await _context.Tutor.FirstOrDefaultAsync(t => t.Id == id);

            if (tutor == null)
            {
                return NotFound();
            }

            var studentList = _context.Match
                                .Where(m => m.TutorId == id)
                                .Include(m => m.Student)
                                .ThenInclude(s => s.User)
                                .Select(m => new {
                                    m.Student.User.FirstName,
                                    m.Student.User.LastName,
                                    m.Student.Id
                                })
                                .ToListAsync();
            return Ok(studentList);
        }



    }
}