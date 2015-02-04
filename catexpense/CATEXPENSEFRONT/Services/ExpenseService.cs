using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class ExpenseService : IExpenseService
    {
        private IRepository<Expense> repository;

        public ExpenseService()
        { }

        public ExpenseService(IRepository<Expense> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.Expense> All()
        {
            return this.repository.All();
        }

        public Models.Expense Create(Models.Expense tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.Expense tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.Expense Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.Expense tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.Expense> CreateAll(IEnumerable<Models.Expense> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}