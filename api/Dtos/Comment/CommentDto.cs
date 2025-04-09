using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CommentDto
    {
        public required string CommenterFirstName { get; set; }
        public required string CommenterLastName { get; set; }
        public required int CommenterId { get; set; }
        public required string Text { get; set; }
        public required int Helpfulness { get; set; }
        public required int Pedagogy { get; set; }
        public required int Easiness { get; set; }
        public required int Id { get; set; }

    }
}

// commenterFirstName: string,
// commenterLastName: string,
// commenterId: number,
// text: string,
// helpfulness: number,
// pedagogy: number,
// easiness: number