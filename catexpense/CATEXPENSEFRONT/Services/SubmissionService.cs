using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;

namespace CatExpenseFront.Services.Interfaces
{
    /// <summary>
    /// Implimentation of the submission service.
    /// </summary>
    public class SubmissionService : ISubmissionService
    {
        private IRepository<Submission> repository;

        /// <summary>
        /// Default Constructor.
        /// </summary>
        public SubmissionService() { }

        /// <summary>
        /// Constructor that accepts a repository.
        /// </summary>
        /// <param name="repository"></param>
        public SubmissionService(IRepository<Submission> repository)
        {
            this.repository = repository;
        }

        /// <summary>
        /// Returns all submissions.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Submission> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates a new submission.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Submission Create(Submission tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates a submission.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Submission tobject)
        {
            return this.repository.Update(tobject);
        }

        /// <summary>
        /// Commits changes to the database.
        /// </summary>
        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        /// <summary>
        /// Returns a submission by submission Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Submission Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a single submission.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Submission tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of submissions.  
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Submission> CreateAll(IEnumerable<Submission> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}