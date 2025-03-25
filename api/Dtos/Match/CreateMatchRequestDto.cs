using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Match
{
    public class CreateMatchRequestDto
    {
        public required int TutorId { get; set; }
        public required string Subject { get; set; }
        public required double Price { get; set; }
    }
}