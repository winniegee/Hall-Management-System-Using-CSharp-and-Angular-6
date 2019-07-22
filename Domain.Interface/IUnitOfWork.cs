using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IHallRepository Halls { get; }
        IPurposeRepository Purposes { get; }
        ILocationRepository Locations { get; }
        IBookingsRepository Bookings { get; }
        void commit();
    }
}
