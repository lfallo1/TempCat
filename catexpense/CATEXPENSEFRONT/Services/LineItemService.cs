using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of lineitem service interface.
    /// </summary>
    public class LineItemService : ILineItemService
    {

        private IRepository<LineItem> repository;

        /// <summary>
        /// Default Constructor.
        /// </summary>
        public LineItemService()
        { }

        /// <summary>
        /// Construcor that accepts a repository.
        /// </summary>
        /// <param name="iRepository"></param>
        public LineItemService(IRepository<LineItem> iRepository)
        {
            this.repository = iRepository;

        }

        /// <summary>
        /// Returns all Line Items
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.LineItem> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates a line item.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.LineItem Create(Models.LineItem tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates an existing line item.  
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.LineItem tobject)
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
        /// Returns a Line item by Line Item Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.LineItem Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a line item.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.LineItem tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of line items.  
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.LineItem> CreateAll(IEnumerable<Models.LineItem> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}