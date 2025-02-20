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
                UserId = studentModel.UserId
            };

        }
    }

}
