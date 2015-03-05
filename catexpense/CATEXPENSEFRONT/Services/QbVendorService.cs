using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of Category inteface.
    /// </summary>
    public class QbVendorService : IQbVendorService
    {
        /// <summary>
        /// Local category repository.
        /// </summary>
        private IRepository<QbVendor> repository;

        /// <summary>
        /// 
        /// </summary>
        public QbVendorService()
        { repository = new Repository<QbVendor>(); }

        /// <summary>
        /// Construcor that accepts a repository.
        /// </summary>
        /// <param name="iRepository"></param>
        public QbVendorService(IRepository<QbVendor> iRepository)
        {
            this.repository = iRepository;
        }

        /// <summary>
        /// Returns all QbVendors.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.QbVendor> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates One QbVendor.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.QbVendor Create(Models.QbVendor tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates a QbVendor.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.QbVendor tobject)
        {
            return this.repository.Update(tobject);
        }

        /// <summary>
        /// Commits the changes.
        /// </summary>
        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        /// <summary>
        /// Returns a QbVendor by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.QbVendor Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a vendor by id.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.QbVendor tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of QbVendors
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.QbVendor> CreateAll(IEnumerable<Models.QbVendor> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}