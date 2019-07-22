using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class User:BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Roles { get; set; }   
        public string Token { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
        public virtual List<Booking> Bookings { get; set; }
    }
}
