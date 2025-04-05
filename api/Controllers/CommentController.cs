using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetTutorComments([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var tutor = await _context.Tutor.
        }
    }
}