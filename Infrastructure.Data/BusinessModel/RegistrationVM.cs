﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class RegistrationVM
    { 
        public string Username { get; set; }
        
        public string Email { get; set; }
    
        public string Password { get; set; }

        [Required]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "This doesn't match password entered earlier!")]
        public string ConfirmPassword { get; set; }
        
        public bool IsHallOwner { get; set; }
        
        public bool IsUser { get; set; }
        
        public bool IsServiceProvider { get; set; }
        
    }
}
