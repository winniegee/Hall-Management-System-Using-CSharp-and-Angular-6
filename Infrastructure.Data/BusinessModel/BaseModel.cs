using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BaseModel
    {
        public void Assign(object source)
        {
            if (source != null)
            {
                var destProperties = GetType().GetProperties();
                foreach (var sourceProperty in source.GetType().GetProperties())
                {
                    foreach (var desProperty in destProperties)
                    {
                        if (desProperty.Name == sourceProperty.Name && desProperty.PropertyType.IsAssignableFrom(sourceProperty.PropertyType))
                        {
                            desProperty.SetValue(this, sourceProperty.GetValue(source, new object[] { }), new object[] { });
                            break;
                        }
                    }
                }
            }
        }
    }
}
