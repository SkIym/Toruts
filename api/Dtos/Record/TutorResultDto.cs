using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;


namespace api.Dtos.Record
{
    public class TutorResultDto : RoleDto
    {
        public int Id { get; set; }
        [Required]
        public string EducAttainment { get; set; } 
        [Required]
        public LearningModal LearningMode { get; set; } 
        [Required]
        public string Venue { get; set; }
        [Required]
        public double Price { get; set; }
        public List<string>? AreasOfExpertise { get; set; }
        public string? TutoringExperiences { get; set; } 
        public string? Availability { get; set; }
        public string? PortraitUrl { get; set; } 
        public Status Status { get; set; } 

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber {get; set; }

        public List<StudentMatchDto>? MatchedStudents { get; set; }
    }

}