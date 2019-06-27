using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class LoginVM
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsUser { get; set; }
        public bool IsHallOwner { get; set; }
        public bool RememberMe { get; set; }
    }
}
