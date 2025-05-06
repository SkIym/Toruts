using api.Data;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// Add controllers for handling API requests
builder.Services.AddControllers();

// Add API Explorer and Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi(); // Add OpenAPI support (if using a specific library)

// Configure JSON serialization to ignore reference loops
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// Database Configuration
// Configure the application to use PostgreSQL with the connection string from appsettings.json
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<Supabase.Client>(_ => 
    new Supabase.Client(
        builder.Configuration["SupabaseUrl"],
        builder.Configuration["SupabaseKey"],
        new SupabaseOptions {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        }
    )
);

// User identity configuration
// Configure Identity with custom password requirements
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true; // Passwords must include a digit
    options.Password.RequireLowercase = true; // Passwords must include a lowercase letter
    options.Password.RequireUppercase = true; // Passwords must include an uppercase letter
    options.Password.RequireNonAlphanumeric = true; // Passwords must include a special character
    options.Password.RequiredLength = 8; // Passwords must be at least 8 characters long
})
.AddEntityFrameworkStores<ApplicationDBContext>(); // Use the ApplicationDBContext for storing identity data

// Authentication Configuration
// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme =
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme; // Use JWT as the default scheme
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,                                                          // Validate the token issuer
        ValidIssuer = builder.Configuration["JWT:Issuer"],                              // Get the issuer from appsettings.json
        ValidateAudience = true,                                                        // Validate the token audience
        ValidAudience = builder.Configuration["JWT:Audience"],                          // Get the audience from appsettings.json
        ValidateIssuerSigningKey = true,                                                // Validate the signing key
        IssuerSigningKey = new SymmetricSecurityKey(                                    // Use the signing key from appsettings.json
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
    };
});

// Add authorization services
builder.Services.AddAuthorization();

// Register the TokenService for dependency injection
builder.Services.AddScoped<ITokenService, TokenService>();

// Build the application
var app = builder.Build();

// Configure the HTTP request pipeline

// Enable Swagger and OpenAPI in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();                                                                   // Enable Swagger middleware
    app.UseSwaggerUI();                                                                 // Enable Swagger UI
    app.MapOpenApi();                                                                   // Map OpenAPI endpoints (if using a specific library)
}

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Configure CORS (Cross-Origin Resource Sharing)
// Allow any method, header, and origin for simplicity (tighten this in production)
app.UseCors(x => x
    .AllowAnyMethod()                                                                   // Allow any HTTP method (GET, POST, etc.)
    .AllowAnyHeader()                                                                   // Allow any HTTP header
    .AllowCredentials()                                                                 // Allow credentials (e.g., cookies)
    .SetIsOriginAllowed(origin => true));                                               // Allow any origin

// Serve frontend stored in wwwroot
app.UseStaticFiles();
app.MapFallbackToFile("index.html");


// Enable authentication and authorization
app.UseAuthentication();                                                                // Enable authentication middleware
app.UseAuthorization();                                                                 // Enable authorization middleware

// Map controllers to endpoints
app.MapControllers();

// Automatically apply database migrations in development
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

        try
        {
            // Ensure the database is created and all migrations are applied
            dbContext.Database.Migrate();
            Console.WriteLine("Database migrations applied successfully.");
        }
        catch (Exception ex)
        {
            // Log or handle the exception
            Console.WriteLine($"An error occurred while applying migrations: {ex.Message}");
        }
    }
}

// Run the application
app.Run();