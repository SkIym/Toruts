using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Dtos.Record;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Data;

namespace api.Controllers
{
    [ApiController]
    [Route("api/record")]
    public class RecordController : ControllerBase
    {
        
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDBContext _context;
        public RecordController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpDelete]
        [Route("delete/{username}")]
        public async Task<IActionResult> Delete([FromRoute] string username)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            // var email = $"{username}@{extension}";
            
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound(username);
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("Deleted user");
        }

        [HttpPut]
        [Route("update/{username}")]
        public async Task<IActionResult> Update([FromRoute] string username, [FromBody] UpdateUserDto updateDto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound(username);
            }

            user.FirstName = updateDto.FirstName;
            user.LastName = updateDto.LastName;

            await _context.SaveChangesAsync();

            return Ok("Updated user");

        }

        // [HttpPost]
        // [Route("create/tutor/{username}")]
        // public async Task<IActionResult> TutorCreate([FromRoute] string username, [FromBody] TutorDto tutorDto)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);
            
        //     var user = await _userManager.FindByNameAsync(username);

        //     if (user == null)
        //     {
        //         return NotFound(username);
        //     }

        //     var tutor = new Tutor 
        //     {
        //         UserId = user.Id,
        //         User = user,
        //         EducAttainment = tutorDto.EducAttainment,
        //         LearningMode = tutorDto.LearningMode,
        //         Venue = tutorDto.Venue,
        //         Price = tutorDto.Price,
        //         AreasOfExpertise = tutorDto.AreasOfExpertise,
        //         TutoringExperiences = tutorDto.TutoringExperiences,
        //         Availability = tutorDto.Availability,
        //         PortraitUrl = tutorDto.PortraitUrl,
        //         Status = tutorDto.Status
        //     };

        //     await _context.Tutor.AddAsync(tutor);
        //     await _context.SaveChangesAsync();

        //     return Ok("Updated user");

        // }
    }
}