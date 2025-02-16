using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Record
{
    public class CreateTutorRequestDto
    {
        public string EducAttainment { get; set; } = string.Empty;
        public LearningModal LearningMode { get; set; } 
        public string Venue { get; set; } = string.Empty;
        public double Price { get; set; }
        public List<string>? AreasOfExpertise { get; set; }
        public string TutoringExperiences { get; set; } = string.Empty;
        public string Availability { get; set; } = string.Empty;
        public string PortraitUrl { get; set; } = string.Empty;
        public Status Status { get; set; } 
    }
}