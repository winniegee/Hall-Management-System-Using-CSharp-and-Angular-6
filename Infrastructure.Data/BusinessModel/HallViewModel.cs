using Domain.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class HallViewModel:BaseModel
    {
        public string Hallname { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [Required]
        [Display(Name = "Confirm Password")]
        [Compare("Password",ErrorMessage = "This doesn't match password entered earlier!")]
        public string ConfirmPassword { get; set; }
        public string Image { get; set; }
        public Booking Bookings { get; set; } 
        public Location Locations { get; set; }
        public int BookingID { get; set; }
        public int LocationID { get; set; }
        public string Purposes { get; set; }
        public IEnumerable<Purpose> Purpose { get; set; } = new List<Purpose>();
        public HallViewModel()
        {

        }
        public HallViewModel(Hall hall)
        {
            Assign(hall);
        }
        public Hall Create()
        {
            return new Hall()
            {
                Name = Hallname,
                Email = Email,
                Price = Price,
                Description = Description,
                Password = Password,
                Image = Image,
                LocationID= Locations.Id,
                LocationName=Locations.Name,
                Purposes=Purpose.Where(x=>x.Name==Purposes).ToList()
            };
        }
    }
}

