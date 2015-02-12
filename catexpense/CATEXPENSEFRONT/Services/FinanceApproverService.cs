using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Crud for finance approvers
    /// </summary>
    public class FinanceApproverService : IFinanceApproverService
    {
        private IRepository<FinanceApprover> repository;

        /// <summary>
        /// Default Constructor
        /// </summary>
        public FinanceApproverService()
        { }

        /// <summary>
        /// Construcotor that accepts a repository
        /// </summary>
        /// <param name="iRepository"></param>
        public FinanceApproverService(IRepository<FinanceApprover> iRepository)
        {
            this.repository = iRepository;

        }

        /// <summary>
        /// Returns all finance approvers
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.FinanceApprover> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates a new finance approver
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.FinanceApprover Create(Models.FinanceApprover tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates an existing finance approver.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.FinanceApprover tobject)
        {
            return this.repository.Update(tobject);
        }

        /// <summary>
        /// Commits the changes to the database.
        /// </summary>
        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        /// <summary>
        /// Returns a finance approver by finance approver id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.FinanceApprover Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a finace approver.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.FinanceApprover tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of finance approvers.
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.FinanceApprover> CreateAll(IEnumerable<Models.FinanceApprover> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}