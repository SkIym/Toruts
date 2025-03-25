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
    [ApiController]
    [Route("api/matches")]
    public class MatchController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly ApplicationDBContext _context;

        public MatchController(UserManager<User> userManager, ApplicationDBContext contect)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("student/{username}")]
        public async Task<IActionResult> GetTutors([FromRoute] string username)

        
    }
}