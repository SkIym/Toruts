using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.Record;
namespace api.Mappers
{
    public static class TutorMappers
    {
        public static TutorDto ToTutorDto(this Tutor tutorModel)
        {
            return new TutorDto
            {
                Id = tutorModel.Id,
                EducAttainment = tutorModel.EducAttainment,
                LearningMode = tutorModel.LearningMode,
                Venue = tutorModel.Venue,
                Price = tutorModel.Price,
                AreasOfExpertise = tutorModel.AreasOfExpertise,
                TutoringExperiences = tutorModel.TutoringExperiences,
                Availability = tutorModel.Availability,
                PortraitUrl = tutorModel.PortraitUrl,
                Status = tutorModel.Status
            };
        }

    }
}