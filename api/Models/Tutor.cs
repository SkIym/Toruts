using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Tutor
    {
        public int Id { get; set; }
        public string EducAttainment { get; set; } = string.Empty;
        public LearningModal LearningMode { get; set; } 
        public string Venue { get; set; } = string.Empty;
        public double Price { get; set; }
        public List<string>? AreasOfExpertise { get; set; }
        public string? TutoringExperiences { get; set; } 
        public string? Availability { get; set; }
        public List<Match>? Matches { get; set; } 
        public string? PortraitUrl { get; set; } 
        public Status Status { get; set; } 
        // Foreign key to  User (Identity User uses ids of type string)
        public required string UserId { get; set; }

        // Navigation property
        public required User User { get; set; } 
    }
}