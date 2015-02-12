using System.Collections.Generic;

namespace CatExpenseFront.Services.Interfaces.Base
{
    /// <summary>
    /// Intface used to impliment all database activity.
    /// </summary>
    /// <typeparam name="TObject"></typeparam>
    public interface IService<TObject> where TObject : class
    {
        /// <summary>
        /// Returns select all from a specific entity
        /// </summary>
        /// <returns></returns>
        IEnumerable<TObject> All();

        /// <summary>
        /// Creates a new entity
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        TObject Create(TObject tobject);

        /// <summary>
        /// Updates an existing entity
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        int Update(TObject tobject);

        /// <summary>
        /// Commits the changes
        /// </summary>
        void SaveChanges();

        /// <summary>
        /// Searchs for an entity by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TObject Find(int id);

        /// <summary>
        /// Physically deletes an entity by id
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        int Delete(TObject tobject);

        /// <summary>
        /// Creates a list of entities in the database.
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        IEnumerable<TObject> CreateAll(IEnumerable<TObject> tobjects);
    }
}