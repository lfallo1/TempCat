using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class CommentService : ICommentService
    {
        private IRepository<Comment> repository;

        public CommentService()
        { }

        public CommentService(IRepository<Comment> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.Comment> All()
        {
            return this.repository.All();
        }

        public Models.Comment Create(Models.Comment tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.Comment tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.Comment Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.Comment tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.Comment> CreateAll(IEnumerable<Models.Comment> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}