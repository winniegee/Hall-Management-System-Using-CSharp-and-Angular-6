﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
   public class Booking : BaseEntity
    {
        public bool Status { get; set; } = false;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public virtual User User { get; set; }
    }
}
