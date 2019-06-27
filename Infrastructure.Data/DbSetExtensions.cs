using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Infrastructure.Data
{
   public static class DbSetExtensions
    {
        public static DbContext GetContext<TEntity>(this DbSet<TEntity> dbset) where TEntity : class
        {
            return (DbContext)dbset.GetType().GetTypeInfo().GetField("_context", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(dbset);
        }
        public static Expression<Func<T, bool>> ConvertToWhereClause<T>(this Expression<Func<T, object>> exp, T obj) where T: class, new()
        {
            var memberExp = (MemberExpression)exp.Body;
            var objPropExp = Expression.PropertyOrField(Expression.Constant(obj),
                memberExp.Member.Name);
            var equalExp = Expression.Equal(exp.Body, objPropExp);
            var exp2 = Expression.Lambda<Func<T, bool>>(equalExp, exp.Parameters);
            return exp2;
        }
        public static void AddOrUpdate<T>(this DbSet<T> dbset, T data, params Expression<Func<T, object>>[] wheres) where T: class, new()
        {
            AddOrUpdate(dbset, new List<T> { data }, wheres);
        }
        public static void AddOrUpdate<T>(this DbSet<T> dbset, List<T> data, params Expression<Func<T, object>>[] wheres) where T : class, new()
        {
            var context = dbset.GetContext();
            foreach(var item in data)
            {
                var query = context.Set<T>().AsNoTracking();
                foreach(var where in wheres)
                {
                    query = query.Where(where.ConvertToWhereClause(item));
                }
                var entity = query.FirstOrDefault();
                if (entity == null)
                {
                    dbset.Add(item);
                }
                else
                {
                    var ids = context.Model.FindEntityType(typeof(T)).FindPrimaryKey().Properties.Select(x => x.Name);
                    var t = typeof(T);
                    List<PropertyInfo> keyfields = t.GetProperties().Where(x => ids.Contains(x.Name)).ToList();
                    foreach(var k in keyfields)
                    {
                        k.SetValue(item, k.GetValue(entity));
                    }
                    dbset.Update(item);
                }
            }

        }

        

    }
    }

