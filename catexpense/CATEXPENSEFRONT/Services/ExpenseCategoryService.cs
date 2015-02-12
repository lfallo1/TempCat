using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of Category inteface.
    /// </summary>
    public class ExpenseCategoryService : IExpenseCategoryService
    {
        /// <summary>
        /// Local category repository.
        /// </summary>
        private IRepository<ExpenseCategory> repository;

        /// <summary>
        /// 
        /// </summary>
        public ExpenseCategoryService()
        { }

        /// <summary>
        /// Construcor that accepts a repository.
        /// </summary>
        /// <param name="iRepository"></param>
        public ExpenseCategoryService(IRepository<ExpenseCategory> iRepository)
        {
            this.repository = iRepository;
        }

        /// <summary>
        /// Returns all expense categories.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.ExpenseCategory> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates One expense category.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.ExpenseCategory Create(Models.ExpenseCategory tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates an expense category.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.ExpenseCategory tobject)
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
        /// Returns an expense category by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.ExpenseCategory Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a category by id.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.ExpenseCategory tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of Expense Categories.
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.ExpenseCategory> CreateAll(IEnumerable<Models.ExpenseCategory> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}