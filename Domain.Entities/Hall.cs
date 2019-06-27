using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
   public class Hall:BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int LocationID { get; set; }
        public string LocationName { get; set; }
        // public int BookingID { get; set; }
        public virtual Location Locations { get; set; }
        public virtual Booking Bookings { get; set; }
        public virtual List<Purpose> Purposes { get; set; }             
    }
}
