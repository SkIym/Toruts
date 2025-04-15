using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Interfaces;
using api.Models;
using api.Data;
using api.Mappers;
using api.Dtos.Record;
using Microsoft.AspNetCore.Authorization;


namespace api.Controllers
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDBContext _context;

        // Construct our stuff
        public StudentController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var studentList = await _context.Student
                .Include(s => s.Matches)
                    .ThenInclude(m => m.Tutor)
                        .ThenInclude(t => t.User)
                .Include(s => s.User)
                .ToListAsync();
            var student = studentList.Select(t => t.ToStudentDto());
            return Ok(student);
        }

        [HttpGet]
        [Route("get/{username}")]
        public async Task<IActionResult> GetByUsername([FromRoute] string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound(username);
            }

            var student = await _context.Student
                .Include(s => s.Matches)
                    .ThenInclude(m => m.Tutor)
                        .ThenInclude(t => t.User)
                .Include(s => s.User)
                .FirstOrDefaultAsync(t => t.UserId == user.Id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student.ToStudentDto());

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var student = await _context.Student
                .Include(s => s.Matches)
                    .ThenInclude(m => m.Tutor)
                        .ThenInclude(t => t.User)
                .Include(s => s.User)
                .FirstOrDefaultAsync(t => t.UserId == id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student.ToStudentDto());
        }

        [Authorize]
        [HttpPost]
        [Route("create/{username}")]
        public async Task<IActionResult> StudentCreate([FromRoute] string username, CreateStudentRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest((ModelState));

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound($"User '{username}' does not exist.");
            }

            var existingStudent = await _context.Student.FirstOrDefaultAsync(t => t.UserId == user.Id);

            if (existingStudent != null)
            {
                return BadRequest("User already has a student account");
            }

            var student = new Student
            {
                UserId = user.Id,
                User = user,
                DegreeProgram = request.DegreeProgram,
                AreasOfImprovemnt = request.AreasOfImprovement,
                DisplayConsent = request.DisplayConsent,
            };

            await _context.Student.AddAsync(student);
            user.Student = student;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = student.Id }, student.ToStudentDto());
        }

        [Authorize]
        [HttpPut]
        [Route("update/{username}")]
        public async Task<IActionResult> Update([FromRoute] string username, [FromBody] UpdateStudentDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound($"User '{username}' does not exist");
            }

            var student = await _context.Student
                .Include(s => s.Matches)
                    .ThenInclude(m => m.Tutor)
                        .ThenInclude(t => t.User)
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.UserId == user.Id);
            if (student == null)
            {
                return NotFound($"User '{username}' does not have a student profile");
            }

            student.AreasOfImprovemnt = updateDto.AreasOfImprovement;
            student.DegreeProgram = updateDto.DegreeProgram;
            student.DisplayConsent = updateDto.DisplayConsent;

            await _context.SaveChangesAsync();

            return Ok(student.ToStudentDto());

        }

    }

}
