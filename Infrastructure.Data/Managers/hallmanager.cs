using Domain.Entities;
using Domain.Interface;
using Infrastructure.Data.BusinessModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data.Managers
{
    public class Hallmanager
    {
        private readonly IUnitOfWork uow;
        // private readonly EventContext context;
        //private readonly IHallRepository repo;
        public Hallmanager( IUnitOfWork uow)
        {
            this.uow = uow;
            //this.repo = repo;
           // this.context = context;
        }
        public void CreateHall(HallViewModel model)
        {
            var hall = uow.Halls.FindByName(model.Hallname);
              if (hall != null) throw new Exception("Hall with this name already exist");
                var entity = model.Create();
            //context.Halls.AddOrUpdate(entity);
            //context.SaveChanges();
            uow.Halls.Add(entity);
            uow.commit();

            //var deptId = result.Result;
            //var result1 = _db.SaveChanges();
            //if (result1.Succeeded == false)
            //{
            //    throw new Exception(result1.Message);
            //}
        }
        public void BookHall(BookingModel model)
        {
            var entity = model.Create();
            uow.Bookings.Add(entity);
            uow.commit();
        }
    }
    }
