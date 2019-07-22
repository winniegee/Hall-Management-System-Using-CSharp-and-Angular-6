using Domain.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly EventContext context;
        public UnitOfWork()
        {
            context = new EventContext();
            Halls = new HallRepo(context);
            Purposes = new PurposeRepo(context);
            Locations = new LocationRepo(context);
            Bookings = new BookingRepo(context);
        }

        public IHallRepository Halls { get; private set; }
        public IPurposeRepository Purposes { get; private set; }
        public ILocationRepository Locations { get; private set; }
        public IBookingsRepository Bookings { get; private set; }
        public void commit()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
