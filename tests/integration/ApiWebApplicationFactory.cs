// using api.Data; // your AppDbContext namespace
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc.Testing;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;

// namespace integration;

// public class ApiWebApplicationFactory<TProgram>
//     : WebApplicationFactory<TProgram> where TProgram : class
// {
//     protected override void ConfigureWebHost(IWebHostBuilder builder)
//     {
//         builder.ConfigureServices(services =>
//         {
//             // 1. Remove the existing AppDbContext registration (Postgres)
//             var descriptor = services.SingleOrDefault(
//                 d => d.ServiceType == typeof(DbContextOptions<ApplicationDBContext>));
//             if (descriptor != null)
//             {
//                 services.Remove(descriptor);
//             }

//             // Also remove the AppDbContext itself if it was registered directly
//             var dbContextDescriptor = services.SingleOrDefault(
//                 d => d.ServiceType == typeof(ApplicationDBContext));
//             if (dbContextDescriptor != null)
//             {
//                 services.Remove(dbContextDescriptor);
//             }

//             // 2. Register the InMemory provider instead
//             services.AddDbContext<ApplicationDBContext>(options =>
//             {
//                 options.UseInMemoryDatabase("TestDb");
//             });

//             // 3. Build the service provider and seed data if needed
//             var sp = services.BuildServiceProvider();
//             using var scope = sp.CreateScope();
//             var db = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
//             db.Database.EnsureCreated();

//             // Seed roles if Identity is used
//             var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
//             if (!roleManager.RoleExistsAsync("User").Result)
//             {
//                 roleManager.CreateAsync(new IdentityRole("User")).Wait();
//             }
//         });
//     }
// }
