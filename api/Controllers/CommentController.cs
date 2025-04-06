using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly ApplicationDBContext _context;

        public CommentController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _context.Comment
                .Include(c => c.Student)
                    .ThenInclude(s => s.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            // If user not found, return 404 Not Found
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpGet]
        [Route("tutor/{id}")]
        public async Task<IActionResult> GetTutorComments([FromRoute] int id)
        {

            var tutor = await _context.Tutor
                .Include(t => t.Comments)
                    .ThenInclude(c => c.Student)
                        .ThenInclude(s => s.User)
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tutor == null) return NotFound("Tutor not found");

            var comments = tutor.Comments
                .Select(c => c.ToCommentDto());

            return Ok(comments);

        }

        [HttpPost]
        [Route("create/{username}")]
        public async Task<IActionResult> GetTutorComments([FromRoute] string username, [FromBody] CreateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound($"User '{username}' does not exist.");
            }

            var student = await _context.Student.FirstOrDefaultAsync(s => s.UserId == user.Id);

            if (student == null)
            {
                return NotFound("User must create a student account first");
            }

            var tutor = await _context.Tutor
                .FirstOrDefaultAsync(t => t.Id == commentDto.TutorId);

            if (tutor == null) return NotFound("Tutor not found");

            var comment = new Comment 
            {
                TutorId = commentDto.TutorId,
                Tutor = tutor,
                StudentId = student.Id,
                Student = student,
                Text = commentDto.Text,
                Helpfulness = commentDto.Helpfulness,
                Pedagogy = commentDto.Pedagogy,
                Easiness = commentDto.Easiness, 
            };

            tutor.Comments.Add(comment);
            student.Comments.Add(comment);

            await _context.Comment.AddAsync(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {
                id = comment.Id }, comment.ToCommentDto());
        }
    }
}