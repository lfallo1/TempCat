using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class SubmissionPageService : ISubmissionPageService
    {
        private IRepository<SubmissionPage> repository;

        public SubmissionPageService()
        { }

        public SubmissionPageService(IRepository<SubmissionPage> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.SubmissionPage> All()
        {
            return this.repository.All();
        }

        public Models.SubmissionPage Create(Models.SubmissionPage tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.SubmissionPage tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.SubmissionPage Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.SubmissionPage tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.SubmissionPage> CreateAll(IEnumerable<Models.SubmissionPage> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}