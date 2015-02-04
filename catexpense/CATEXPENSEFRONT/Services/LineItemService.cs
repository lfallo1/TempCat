using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class LineItemService : ILineItemService
    {
        private IRepository<LineItem> repository;

        public LineItemService()
        { }

        public LineItemService(IRepository<LineItem> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.LineItem> All()
        {
            return this.repository.All();
        }

        public Models.LineItem Create(Models.LineItem tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.LineItem tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.LineItem Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.LineItem tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.LineItem> CreateAll(IEnumerable<Models.LineItem> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}