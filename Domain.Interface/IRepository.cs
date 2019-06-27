using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Domain.Interface
{
    public interface IRepository<T> where T : class
    {
        
        IEnumerable<T> GetAll();
        T Get(int id);
        void Add(T Entity);
        void Addd(Hall Entity);
        // void Update(T Entity);
        void Remove(T Entity);
        void Delete(T Entity);
        // IQueryable<T> FindByName(string name);
        T FindByName(string name);

    }
}
