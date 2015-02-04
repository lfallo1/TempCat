using System;
using System.Collections.Generic;
using System.Linq;


namespace CatExpenseFront.Repository
{
    public interface IRepository<TObject> : IDisposable where TObject : class
    {
        /// <summary>
        /// Get list of objects
        /// </summary>
        /// <returns></returns>
        IEnumerable<TObject> AsEnumerable();

        /// <summary>
        /// Gets all objects from database
        /// </summary>
        IQueryable<TObject> All();

        /// <summary>
        /// Find object by keys.
        /// </summary>
        /// <param name="keys">Specified the search keys.</param>
        TObject Find(params object[] keys);

        /// <summary>
        /// Create a new object to database.
        /// </summary>
        /// <param name="t">Specified a new object to create.</param>
        TObject Create(TObject tobject);

        /// <summary>
        /// Create a list of new objects to database
        /// </summary>
        /// <param name="TObjects">Specified a new list object to create.</param>
        /// <returns></returns>
        IEnumerable<TObject> CreateAll(IEnumerable<TObject> tobjects);

        /// <summary>
        /// Delete the object from database.
        /// </summary>
        /// <param name="t">Specified a existing object to delete.</param>    
        int Delete(TObject tobject);

        /// <summary>
        /// Update object changes and save to database.
        /// </summary>
        /// <param name="t">Specified the object to save.</param>
        int Update(TObject tobject);

        /// <summary>
        /// Save changes
        /// </summary>
        void SaveChanges();

        /// <summary>
        /// Dispose object
        /// </summary>
        void Dispose();

        /// <summary>
        /// Get list of objects with stored procedure
        /// </summary>
        /// <returns></returns>
        IEnumerable<TObject> SqlQuery(string sql);

        /// <summary>
        /// Find object by keys with stored procedure.
        /// </summary>
        /// <param name="keys">Specified the search keys.</param>
        TObject SqlQuery(string sql, params object[] keys);

    }

}
