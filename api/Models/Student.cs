using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Student
    {
        public int Id { get; set; }
        public List<string>? AreasOfImprovemnt { get; set; } = [];
        public string? DegreeProgram { get; set; } = string.Empty;

        public ICollection<Match> Matches { get; set; } = new List<Match>();

        // Foreign key to  User (Identity User uses ids of type string)
        public required string UserId { get; set; }

        // Navigation property
        public required User User { get; set; }
    }
}
