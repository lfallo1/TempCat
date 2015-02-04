using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;


namespace CatExpenseFront.Utilities
{
    public class RepliconUserService : IRepliconUserService
    {
        private IRepository<RepliconUser> repository;

        public RepliconUserService()
        { }

        public RepliconUserService(IRepository<RepliconUser> iRepository)
        {
            this.repository = iRepository;

        }
        public IEnumerable<Models.RepliconUser> All()
        {
            return this.repository.All();
        }

        public Models.RepliconUser Create(Models.RepliconUser tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Models.RepliconUser tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Models.RepliconUser Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Models.RepliconUser tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.RepliconUser> CreateAll(IEnumerable<Models.RepliconUser> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}