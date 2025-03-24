using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Record
{
    public class CreateTutorRequestDto
    {
        [Required(ErrorMessage = "Educational attainment is required.")]
        public string EducAttainment { get; set; }

        [Required(ErrorMessage = "Learning mode is required.")]
        public LearningModal LearningMode { get; set; }

        [Required(ErrorMessage = "Venue is required.")]
        public string Venue { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        public double Price { get; set; }

        public List<string>? AreasOfExpertise { get; set; }
        public string? TutoringExperiences { get; set; }
        public string? Availability { get; set; }
        
        [Required(ErrorMessage = "Status is required.")]
        public Status Status { get; set; }
    }
}