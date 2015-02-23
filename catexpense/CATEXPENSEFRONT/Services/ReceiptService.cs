using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of the Receipt service interface.
    /// </summary>
    public class ReceiptService : IReceiptService
    {
        private IRepository<Receipt> repository;

        /// <summary>
        /// Default Constructor.
        /// </summary>
        public ReceiptService()
        { }

        /// <summary>
        ///Constructor that accepts a repository.   
        /// </summary>
        /// <param name="iRepository"></param>
        public ReceiptService(Repository<Receipt> iRepository)
        {
            this.repository = iRepository;
        }

        /// <summary>
        /// Returns all receipts.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.Receipt> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates a new reciept.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.Receipt Create(Models.Receipt tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates a single receipt.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.Receipt tobject)
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
        /// Gets a receipt by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.Receipt Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Delete a receipt.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.Receipt tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.Receipt> CreateAll(IEnumerable<Models.Receipt> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}