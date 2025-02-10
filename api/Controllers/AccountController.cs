using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDBContext _context;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManger;
        public AccountController(UserManager<User> userManager, ApplicationDBContext context, ITokenService tokenService, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManger = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            Console.WriteLine("Logging in...");
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManger.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded) return Unauthorized("Username not found and/or incorrect passowrd");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDto signupDto)
        {
            try 
            {
                if (!ModelState.IsValid)
                return BadRequest(ModelState);  
                
                Console.WriteLine("Signing up...");
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
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
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