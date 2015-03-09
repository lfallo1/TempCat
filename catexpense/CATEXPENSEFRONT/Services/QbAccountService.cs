using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class QbAccountService : IQbAccountService
    {
    /// <summary>
        /// Local category repository.
        /// </summary>
        private IRepository<QbAccount> repository;

        /// <summary>
        /// 
        /// </summary>
        public QbAccountService()
        { repository = new Repository<QbAccount>(); }

        /// <summary>
        /// Construcor that accepts a repository.
        /// </summary>
        /// <param name="iRepository"></param>
        public QbAccountService(IRepository<QbAccount> iRepository)
        {
            this.repository = iRepository;
        }

        /// <summary>
        /// Returns all QbAccounts.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.QbAccount> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates One QbAccount.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.QbAccount Create(Models.QbAccount tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates a QbAccount.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.QbAccount tobject)
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
        /// Returns a QbAccount by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.QbAccount Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes an Account by id.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.QbAccount tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of QbAccounts
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.QbAccount> CreateAll(IEnumerable<Models.QbAccount> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}