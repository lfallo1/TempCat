using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatExpenseFront.Utilities
{
    public interface ICatExpenseContext
    {
        void Dispose();

        int SaveChanges();

        /// <summary>
        ///   Gets a System.Data.Entity.Infrastructure.DbEntityEntry object for the given
        ///     entity providing access to information about the entity and the ability to
        ///     perform actions on the entity.
        /// </summary>
        /// <param name="entity">  entity:
        ///     The entity.</param>
        /// <returns> An entry for the entity.</returns>
        DbEntityEntry Entry(object entity);

    }
}
