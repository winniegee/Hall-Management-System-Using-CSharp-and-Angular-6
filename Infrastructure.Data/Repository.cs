using Domain.Entities;
using Domain.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Infrastructure.Data
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private EventContext context;
        public Repository(EventContext context)
        {
            this.context = context;

        }
        public void Addd(Hall Entity)
        {
            if (Entity == null)
            {
                throw new ArgumentNullException("Entity");
            }
            context.Set<Hall>();
            context.Halls.AddOrUpdate(Entity, x => x.Name);
            context.SaveChanges();
        }
        public void Add(T Entity)
        {
            if (Entity == null)
            {
                throw new ArgumentNullException("Entity");
            }
            context.Set<T>().Add(Entity);
            context.SaveChanges();
        }

        public void Delete(T Entity)
        {
            if (Entity == null)
            {
                throw new ArgumentNullException("Entity");
            }
            context.Set<T>().Remove(Entity);
            context.SaveChanges();
        }

        public T FindByName(string name)
        {
            return context.Set<T>().Where(x => x.Name == name).FirstOrDefault();
        }

        public T Get(int id)
        {
            return context.Set<T>().Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return context.Set<T>().AsEnumerable();
        }

        public void Remove(T Entity)
        {
            if (Entity == null)
            {
                throw new ArgumentNullException("Entity");
            }
            context.Set<T>().Remove(Entity);
            context.SaveChanges();
        }
        //public void SaveChanges()
        //{
        //    context.SaveChanges();
        //}

        //public void Update(T Entity)
        //{
        //    if (Entity == null)
        //    {
        //        throw new ArgumentNullException("Entity");
        //    }
        //    context.SaveChanges();
        //}
    }
}

