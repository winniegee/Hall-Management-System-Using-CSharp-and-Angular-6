using Domain.Entities;
using Domain.Interface;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service
{
    public class HallServices<T> : IService<T> where T : BaseEntity
    {
        private readonly IRepository<T> repo;
        public HallServices(IRepository<T> repo)
        {
            this.repo = repo;
        }
        public void Add(T Entity)
        {
            repo.Add(Entity);
        }

        public void Delete(T Entity)
        {
            repo.Delete(Entity);
        }

        public IQueryable<T> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public T Get(int id)
        {
            return repo.Get(id);
        }

        public IEnumerable<T> GetAll()
        {
            return repo.GetAll();
        }

        public void Remove(T Entity)
        {
            repo.Remove(Entity);
        }

        //public void SaveChanges()
        //{
        //    repo.SaveChanges();
        //}

        //public void Update(T Entity)
        //{
        //    repo.Update(Entity);
        //}
    }
}
