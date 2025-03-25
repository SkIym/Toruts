using api.Models;
using api.Dtos.Record;

namespace api.Mappers
{
    public static class StudentMappers
    {
        public static StudentDto ToStudentDto(this Student studentModel)
        {

            return new StudentDto
            {
                Id = studentModel.Id,
                AreasOfImprovement = studentModel.AreasOfImprovemnt,
                DegreeProgram = studentModel.DegreeProgram,
                MatchedTutors = studentModel.Matches?
                    .Select(m => new TutorMatchDto
                    {
                        Id = m.TutorId,
                        FirstName = m.Tutor.User.FirstName,
                        LastName = m.Tutor.User.LastName,
                        PortraitUrl = m.Tutor.PortraitUrl
                    })
                    .ToList()
            };

        }
    }

}
