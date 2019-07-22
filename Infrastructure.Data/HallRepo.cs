using Domain.Entities;
using Domain.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data
{
    public class HallRepo : Repository<Hall>, IHallRepository
    {
        public HallRepo(EventContext context) : base(context)
        {

        }
        public IEnumerable<Hall> Halls
        {
            get { return this.GetAll(); }
        }

    }
    public class LocationRepo : Repository<Location>, ILocationRepository
    {
        public LocationRepo(EventContext context) : base(context)
        {

        }
        public IEnumerable<Location> loc
        {
            get { return this.GetAll(); }
        }
    }
    public class PurposeRepo : Repository<Purpose>, IPurposeRepository
    {
        public PurposeRepo(EventContext context) : base(context)
        {

        }
        public IEnumerable<Purpose> pur
        {
            get { return this.GetAll(); }
        }
    }
    public class BookingRepo:Repository<Booking>, IBookingsRepository
    {
        public BookingRepo(EventContext context) : base(context) { }
            public IEnumerable<Booking> booking
        {
            get { return this.GetAll(); }
        }
    }
}