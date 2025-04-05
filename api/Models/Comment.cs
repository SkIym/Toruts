using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public required int TutorId { get; set; }
        public required Tutor Tutor { get; set;}
        public required int StudentId { get; set; }
        public required Student Student { get; set; }
        public required string Text { get; set; }
        public required int Helpfulness { get; set; }
        public required int Pedagogy { get; set; }
        public required int Easiness { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}