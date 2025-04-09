using api.Enums;

namespace api.Dtos.Record
{
    public class CreateStudentRequestDto
    {
        public List<string>? AreasOfImprovement { get; set; }
        public string? DegreeProgram { get; set; }
        public required bool DisplayConsent { get; set; }
    }
}
