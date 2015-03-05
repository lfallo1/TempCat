using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of Category inteface.
    /// </summary>
    public class QbClientService : IQbClientService
    {
        /// <summary>
        /// Local category repository.
        /// </summary>
        private IRepository<QbClient> repository;

        /// <summary>
        /// 
        /// </summary>
        public QbClientService()
        { repository = new Repository<QbClient>(); }

        /// <summary>
        /// Construcor that accepts a repository.
        /// </summary>
        /// <param name="iRepository"></param>
        public QbClientService(IRepository<QbClient> iRepository)
        {
            this.repository = iRepository;
        }

        /// <summary>
        /// Returns all QbClients.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.QbClient> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates One QbClient.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.QbClient Create(Models.QbClient tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates a QbClient.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.QbClient tobject)
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
        /// Returns a QbClient by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.QbClient Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a Client by id.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.QbClient tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of QbClients
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.QbClient> CreateAll(IEnumerable<Models.QbClient> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}