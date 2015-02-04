using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class FinanceApproverService : IFinanceApproverService
    {
        private IRepository<FinanceApprover> repository;

        public FinanceApproverService()
        { }

        public FinanceApproverService(IRepository<FinanceApprover> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.FinanceApprover> All()
        {
            return this.repository.All();
        }

        public Models.FinanceApprover Create(Models.FinanceApprover tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.FinanceApprover tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.FinanceApprover Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.FinanceApprover tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.FinanceApprover> CreateAll(IEnumerable<Models.FinanceApprover> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}