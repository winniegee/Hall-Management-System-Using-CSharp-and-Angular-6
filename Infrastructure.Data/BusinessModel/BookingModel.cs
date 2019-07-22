using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;

namespace Infrastructure.Data.BusinessModel
{
    public class BookingModel
    {
        public bool Status { get; set; } = false;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
       // public int UserID { get; set; }
        public int HallID { get; set; }

      //  public User User { get; set; }
        public Hall Hall { get; set; }
        public Booking Create()
        {
            return new Booking
            {
                Status=Status,
                StartTime=StartTime,
                EndTime=EndTime,
                HallID=HallID,
               // UserID=UserID

            };
        }
    }

}
