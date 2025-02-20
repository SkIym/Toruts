using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Record;
using api.Models;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static UpdateUserDto ToUpdateUserDto(this User userModel)
        {
            return new UpdateUserDto
            {
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                PhoneNumber = userModel.PhoneNumber
            };
        }
    }
}