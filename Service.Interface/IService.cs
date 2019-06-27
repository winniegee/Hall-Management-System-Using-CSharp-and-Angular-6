using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Service.Interface
{
    public interface IService<T> where T : BaseEntity
    {
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        IEnumerable<T> GetAll();
        T Get(int id);
        void Add(T Entity);
        // void Update(T Entity);
        void Remove(T Entity);
        void Delete(T Entity);
        //void SaveChanges();
    }
}
