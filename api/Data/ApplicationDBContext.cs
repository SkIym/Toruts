using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User> 
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Tutor> Tutor { get; set; }

        public DbSet<Match> Match { get; set; }
        public DbSet<Comment> Comment { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "Admin",
                    Name = "Admin",
                    NormalizedName = "ADMIN"

                },
                new IdentityRole
                {
                    Id = "User",
                    Name = "User",
                    NormalizedName = "USER"

                },
            };
            builder.Entity<IdentityRole>()
                .HasData(roles);

            builder.Entity<Student>()
                .HasOne(s => s.User)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Tutor>()
                .HasOne(t => t.User)
                .WithOne(u => u.Tutor)
                .HasForeignKey<Tutor>(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Match>()
                .HasOne(m => m.Student)
                .WithMany(s => s.Matches)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Match>()
                .HasOne(m => m.Tutor)
                .WithMany(t => t.Matches)
                .HasForeignKey(m => m.TutorId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Comment>()
                .HasOne(c => c.Student)
                .WithMany(s => s.Comments)
                .HasForeignKey(c => c.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(c => c.Tutor)
                .WithMany(t => t.Comments)
                .HasForeignKey(c => c.TutorId)
                .OnDelete(DeleteBehavior.Cascade);
        }   
    }
}