using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Interfaces;
using api.Models;
using api.Data;
using api.Mappers;


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
            var studentList = await _context.Student.ToListAsync();
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

            var student = await _context.Student.FirstOrDefaultAsync(t => t.UserId == user.Id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student.ToStudentDto());

        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var student = await _context.Student.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student.ToStudentDto());
        }
    }

}
