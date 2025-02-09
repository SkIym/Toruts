using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Data;
namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDBContext _context;
        public AccountController(UserManager<User> userManager, ApplicationDBContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDto signupDto)
        {
            try 
            {
                if (!ModelState.IsValid)
                return BadRequest(ModelState);  

                var appUser = new User
                {
                    UserName =  signupDto.UserName,
                    Email = signupDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, signupDto.Password);

                if(createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok("User created");
                    } else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                } else 
                {
                    return StatusCode(500, createdUser.Errors);
                }

            } catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
        
        [HttpDelete]
        [Route("{username}")]
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
    }
}