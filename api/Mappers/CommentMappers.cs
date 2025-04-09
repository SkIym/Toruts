using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;

using api.Models;

namespace api.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                CommenterFirstName = commentModel.Student.User.FirstName,
                CommenterLastName = commentModel.Student.User.LastName,
                CommenterId = commentModel.Student.Id,
                Text = commentModel.Text,
                Helpfulness = commentModel.Helpfulness,
                Pedagogy = commentModel.Pedagogy,
                Easiness = commentModel.Easiness,
                Id = commentModel.Id
            };
        }
    }
}