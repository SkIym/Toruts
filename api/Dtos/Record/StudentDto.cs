using api.Enums;

namespace api.Dtos.Record
{
    public class StudentDto: RoleDto
    {
        public int Id { get; set; }

        public List<string>? AreasOfImprovement { get; set; }
        public string? DegreeProgram { get; set; }

        public List<TutorMatchDto>? MatchedTutors { get; set; }
        public bool DisplayConsent { get; set; }

    }

    public class TutorMatchDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; } 
        public required string LastName { get; set; } 

        public string? PortraitUrl { get; set; }
    }
    
    public class UpdateStudentDto
    {
        public List<string>? AreasOfImprovement { get; set; }
        public string? DegreeProgram { get; set; }
        public required bool DisplayConsent { get; set; }
    }
}
