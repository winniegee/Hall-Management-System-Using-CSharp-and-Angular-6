using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Infrastructure.Data.BusinessModel
{
   public class UserVM:BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        [Required]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "This doesn't match password entered earlier!")]
        public string ConfirmPassword { get; set; }

    public UserVM()
    {

    }
    public UserVM(User user)
    {
        Assign(user);
    }
    public User Create()
    {
        return new User()
        {
            FirstName=FirstName,
            LastName=LastName,
            UserName = UserName,
            Email = Email,
            PasswordHash=PasswordHash
        };
    }
}
}
