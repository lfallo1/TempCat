using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class LineItemCommentService : ILineItemCommentService
    {
        private IRepository<LineItemComment> repository;

        public LineItemCommentService()
        { }

        public LineItemCommentService(IRepository<LineItemComment> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.LineItemComment> All()
        {
            return this.repository.All();
        }

        public Models.LineItemComment Create(Models.LineItemComment tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.LineItemComment tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.LineItemComment Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.LineItemComment tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.LineItemComment> CreateAll(IEnumerable<Models.LineItemComment> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}