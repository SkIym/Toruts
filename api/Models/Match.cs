using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Match
    {
        public int Id { get; set; }
        public required int TutorId { get; set; }
        public required Tutor Tutor { get; set;}
        public required int StudentId { get; set; }
        public required Student Student { get; set; }
        public required string Subject { get; set; }
        public double Price { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
    }
}