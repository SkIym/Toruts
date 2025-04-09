using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentRequestDto
    {
        public required int TutorId { get; set; }
        public required string Text { get; set; }
        public required int Helpfulness { get; set; }
        public required int Pedagogy { get; set; }
        public required int Easiness { get; set; }
        public required int Id { get; set; }
    }
}