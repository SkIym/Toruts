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
using api.Enums;
using api.Mappers;
using api.Dtos.Record;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // UserManager for managing user-related operations
        private readonly UserManager<User> _userManager;

        // TokenService for generating JWT tokens
        private readonly ITokenService _tokenService;

        // SignInManager for handling user sign-in operations
        private readonly SignInManager<User> _signInManger;

        // Constructor to inject dependencies
        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManger = signInManager;
        }

        // POST endpoint for user login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            // Validate the model state
            if (!ModelState.IsValid) return BadRequest(new { Message = "Invalid model state", Errors = ModelState.Values.SelectMany(v => v.Errors) });

            // Find the user by username
            var user = await _userManager.Users
                    .Include(u => u.Tutor)
                    .Include(u => u.Student)
                    .FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);

            // If user not found, return unauthorized
            if (user == null) return Unauthorized("Username does not exist");

            // Check if the password is correct
            var result = await _signInManger.CheckPasswordSignInAsync(user, loginDto.Password, false);

            // If password check fails, return unauthorized
            // NOTE: for security, username or password dapat sabihin nating mali not password lang kasi malalaman na tama ung username
            if (!result.Succeeded) return Unauthorized("Incorrect username or password");

            var isTutor = user.Tutor != null;
            var isStudent = user.Student != null;
            var token = _tokenService.CreateToken(user);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,     // Set true for prod
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(1)
            };

            Response.Cookies.Append("accessToken", token, cookieOptions);
            
            // Return user details and JWT token
            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    UserType = isTutor ? UserType.TUTOR : (isStudent ? UserType.STUDENT : null),
                    PrimaryInfo = user.ToUpdateUserDto(),
                    RoleInfo = isTutor ? user.Tutor.ToTutorDto() : (isStudent ? user.Student.ToStudentDto() : null),
                    Dual = isTutor && isStudent
                }
            );
        }

        // POST endpoint for user logout
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken");
            return Ok("User logged out");
        }

        // POST endpoint for user signup
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDto signupDto)
        {
            try
            {
                // Validate the model state
                if (!ModelState.IsValid) return BadRequest(new { Message = "Invalid model state", Errors = ModelState.Values.SelectMany(v => v.Errors) });

                // Check if the username already exists
                var userExists = await _userManager.FindByNameAsync(signupDto.UserName);
                if (userExists != null) return BadRequest(new { Message = "Username already exists" });

                // Check if the email already exists
                var emailExists = await _userManager.FindByEmailAsync(signupDto.Email);
                if (emailExists != null) return BadRequest(new { Message = "Email already exists" });

                Console.WriteLine("Signing up...");

                // Create a new user object
                var appUser = new User
                {
                    UserName = signupDto.UserName,
                    Email = signupDto.Email,
                    FirstName = signupDto.FirstName,
                    LastName = signupDto.LastName,
                    PhoneNumber = signupDto.PhoneNumber
                };

                // Attempt to create the user
                var createdUser = await _userManager.CreateAsync(appUser, signupDto.Password);

                // If user creation is successful
                if (createdUser.Succeeded)
                {
                    // Assign the "User" role to the new user
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        var token = _tokenService.CreateToken(appUser);
                        var cookieOptions = new CookieOptions
                        {
                            HttpOnly = true,
                            Secure = false,     // Set true for prod
                            SameSite = SameSiteMode.Strict,
                            Expires = DateTime.UtcNow.AddHours(1)
                        };

                        Response.Cookies.Append("accessToken", token, cookieOptions);

                        // Return user details 
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                PrimaryInfo = new UpdateUserDto
                                {
                                    FirstName = appUser.FirstName,
                                    LastName = appUser.LastName,
                                    PhoneNumber = appUser.PhoneNumber
                                }
                            }
                        );
                    }
                    else
                    {
                        // Return role assignment errors
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    // Return user creation errors
                    return StatusCode(500, new { Message = "User creation failed", Errors = createdUser.Errors });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e); // Log the exception for debugging
                return StatusCode(500, new { Message = "An error occurred while processing your request.", Errors = e });
            }
        }
    }
}