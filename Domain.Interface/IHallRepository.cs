using Domain.Entities;
using System;

namespace Domain.Interface
{
    public interface IHallRepository : IRepository<Hall>
    {

    }
    public interface ILocationRepository : IRepository<Location> { }
    public interface IPurposeRepository : IRepository<Purpose> { }
}
