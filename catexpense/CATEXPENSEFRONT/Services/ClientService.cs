using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Utilities
{
    public class ClientService : IClientService
    {
        private IRepository<Client> repository;

        public ClientService()
        { }

        public ClientService(IRepository<Client> repository)
        {
            this.repository = repository;
        }

        public System.Collections.Generic.IEnumerable<Client> All()
        {
            return this.repository.All();
        }

        public Client Create(Client tobject)
        {
            return this.repository.Create(tobject);
        }

        public int Update(Client tobject)
        {
            return this.repository.Update(tobject);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        public Client Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Delete(Client tobject)
        {
            return this.repository.Delete(tobject);
        }

        public System.Collections.Generic.IEnumerable<Client> CreateAll(System.Collections.Generic.IEnumerable<Client> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}