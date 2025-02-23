using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Record;
using api.Enums;

namespace api.Dtos.Account
{
    public class NewUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public UserType? UserType { get; set; }

        public UpdateUserDto? PrimaryInfo {get; set;}

        public RoleDto? RoleInfo { get; set; }
    }
}