using System.Collections.Generic;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class Service<TObject> : IService<TObject> where TObject : class
    {
        private IValidationDictionary validationDictionary;
        private IRepository<TObject> repository;

        public Service(IValidationDictionary validationDictionary, IRepository<TObject> repository)
        {
            this.validationDictionary = validationDictionary;
            this.repository = repository;
        }

        public Service()
        {
            
        }

        public TObject Create(TObject tobject)
        {
            return repository.Create(tobject);
        }

        public IEnumerable<TObject> All()
        {
            return repository.All();
        }

        public int Update(TObject tobject)
        {
            return repository.Update(tobject);
        }

        public void SaveChanges()
        {
            repository.SaveChanges();
        }

        public TObject Find(int id)
        {
            return repository.Find(id);
        }

        public int Delete(TObject tobject)
        {
            return repository.Delete(tobject);
        }

        public IEnumerable<TObject> CreateAll(IEnumerable<TObject> tobjects)
        {
            return repository.CreateAll(tobjects);
        }
    }
}