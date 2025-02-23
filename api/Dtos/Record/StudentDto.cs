using api.Enums;

namespace api.Dtos.Record
{
    public class StudentDto: RoleDto
    {
        public int Id { get; set; }

        public List<string>? AreasOfImprovement { get; set; }
        public string? DegreeProgram { get; set; }

        public required string UserId { get; set; }


    }
    
    public class UpdateStudentDto
    {
        public List<string>? AreasOfImprovement { get; set; }
        public string? DegreeProgram { get; set; }
    }
}
