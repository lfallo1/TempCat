using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;

namespace CatExpenseFront.Services.Interfaces
{
    public class SubmissionService : ISubmissionService
    {
        private IRepository<Submission> repository;

        public SubmissionService() { }

        public SubmissionService(IRepository<Submission> repository)
        {
            this.repository = repository;
        }

        public IEnumerable<Submission> All()
        {
            return this.repository.All();
        }

        public Submission Create(Submission tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Submission tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Submission Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Submission tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Submission> CreateAll(IEnumerable<Submission> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}