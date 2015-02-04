using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class ExpenseCategoryService : IExpenseCategoryService
    {
        private IRepository<ExpenseCategory> repository;

        public ExpenseCategoryService()
        { }

        public ExpenseCategoryService(IRepository<ExpenseCategory> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.ExpenseCategory> All()
        {
            return this.repository.All();
        }

        public Models.ExpenseCategory Create(Models.ExpenseCategory tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.ExpenseCategory tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.ExpenseCategory Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.ExpenseCategory tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.ExpenseCategory> CreateAll(IEnumerable<Models.ExpenseCategory> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}