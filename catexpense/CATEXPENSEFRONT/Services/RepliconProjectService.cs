using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;
namespace CatExpenseFront.Services
{
    public class RepliconProjectService : IRepliconProjectService
    {
        private IRepository<RepliconProject> repository;

        public RepliconProjectService(IRepository<RepliconProject> repository)
        {
            this.repository = repository;
        }

        public RepliconProjectService()
        { }

        public System.Collections.Generic.IEnumerable<RepliconProject> All()
        {
            return this.repository.All();
        }

        public RepliconProject Create(RepliconProject tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(RepliconProject tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public RepliconProject Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(RepliconProject tobject)
        {
            return this.repository.Delete(tobject);
        }

        public System.Collections.Generic.IEnumerable<RepliconProject> CreateAll(System.Collections.Generic.IEnumerable<RepliconProject> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}