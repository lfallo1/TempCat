using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class ReceiptService : IReceiptService
    {
        private IRepository<Receipt> repository;

        public ReceiptService()
        { }

        public ReceiptService(IRepository<Receipt> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.Receipt> All()
        {
            return this.repository.All();
        }

        public Models.Receipt Create(Models.Receipt tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.Receipt tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.Receipt Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.Receipt tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.Receipt> CreateAll(IEnumerable<Models.Receipt> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}