using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public AccountController(UserManager<User> userManager)
        {
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
    }
}