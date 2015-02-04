using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Repository;
using CatExpenseFront.Models;
using CatExpenseFront;
using System.DirectoryServices.AccountManagement;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// ORM for user Projects
    /// </summary>
    public class RepliconUserProjectService : IRepliconUserProjectService
    {
        private IRepository<RepliconUserProject> repository;

        /// <summary>
        /// Constuctor that accepts repository
        /// </summary>
        /// <param name="iRepository"></param>
        public RepliconUserProjectService(IRepository<RepliconUserProject> repository)
        {
            this.repository = repository;

        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public RepliconUserProjectService()
        {
            this.repository = new CatExpenseFront.Repository.Repository<RepliconUserProject>();
        }


        /// <summary>
        /// Fet all User Projects
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.RepliconUserProject> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates a New User project
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.RepliconUserProject Create(Models.RepliconUserProject tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates a user project
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.RepliconUserProject tobject)
        {
            return this.repository.Update(tobject);
        }

        /// <summary>
        /// commits the changes
        /// </summary>
        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        /// <summary>
        /// search by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.RepliconUserProject Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// delete a project
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.RepliconUserProject tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Create a list of user projects
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.RepliconUserProject> CreateAll(IEnumerable<Models.RepliconUserProject> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }


    }
}