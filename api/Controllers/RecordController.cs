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
using api.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [ApiController]
    [Route("api/record")]
    public class RecordController : ControllerBase
    {
        // UserManager for managing user-related operations
        private readonly UserManager<User> _userManager;

        // ApplicationDBContext for interacting with the database
        private readonly ApplicationDBContext _context;

        // Constructor to inject dependencies
        public RecordController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }


        // DELETE endpoint to delete a user by username
        [Authorize]
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete()
        {
            // Validate the model state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User?.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Invalid session. Please log-in again");
            }
            

            // Find the user by username
            var user = await _userManager.FindByNameAsync(username);

            // If user not found, return 404 Not Found
            if (user == null)
            {
                return NotFound(username);
            }

            // Remove the user from the database
            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            // Return success message
            return Ok("Deleted user");
        }


        // PUT endpoint to update a user's first and last name by username
        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromBody] UpdateUserDto updateDto)
        {
            // Validate the model state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var username = User?.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Invalid session. Please log-in again");
            }
            

            // Find the user by username
            var user = await _userManager.FindByNameAsync(username);

            // If user not found, return 404 Not Found
            if (user == null)
            {
                return NotFound(username);
            }

            // Update the user's first and last name
            user.FirstName = updateDto.FirstName;
            user.LastName = updateDto.LastName;
            user.PhoneNumber = updateDto.PhoneNumber;

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return success message
            return Ok(user.ToUpdateUserDto());
        }

    }
}