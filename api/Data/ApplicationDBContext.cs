using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext // We using EntitiyFrameworkCore !! (ORM)
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Tutor> Tutor { get; set; }

    }
}