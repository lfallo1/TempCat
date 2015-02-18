using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Repository;
using CatExpenseFront.Models;

namespace CatExpenseFront.Services
{
    public class ErrorService : IErrorService
    {

        private IRepository<Error> repository;

        public ErrorService() { }

        public ErrorService(IRepository<Error> irepository)
        {
            this.repository = irepository;
        }

        public Models.Error Create(Models.Error tobject)
        {
            return this.repository.Create(tobject);
        }

        public Models.Error Find(int id)
        {
            return this.repository.Find(id);
        }

        public int Update(Models.Error tobject)
        {
            return this.repository.Update(tobject);
        }

        public int Delete(Models.Error tobject)
        {
            return this.repository.Delete(tobject);
        }

        public IEnumerable<Models.Error> All()
        {
            return this.repository.All();
        }

        public IEnumerable<Models.Error> CreateAll(IEnumerable<Models.Error> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }

        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }
    }
}