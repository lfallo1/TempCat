using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of the Comment interface
    /// </summary>
    public class CommentService : ICommentService
    {
        /// <summary>
        /// The Comment repository.
        /// </summary>
        private IRepository<Comment> repository;

        /// <summary>
        /// Default Constructor
        /// </summary>
        public CommentService()
        { }

        /// <summary>
        /// Constructor that accepts a repository.
        /// </summary>
        /// <param name="iRepository"></param>
        public CommentService(IRepository<Comment> iRepository)
        {
            this.repository = iRepository;

        }
        /// <summary>
        /// Returns all comments.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Models.Comment> All()
        {
            return this.repository.All();
        }

        /// <summary>
        /// Creates a new Comment.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public Models.Comment Create(Models.Comment tobject)
        {
            return this.repository.Create(tobject);
        }

        /// <summary>
        /// Updates an existing comment.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Update(Models.Comment tobject)
        {
            return this.repository.Update(tobject);
        }

        /// <summary>
        /// Commits the changes.
        /// </summary>
        public void SaveChanges()
        {
            this.repository.SaveChanges();
        }

        /// <summary>
        /// Gets a comment by comment id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Models.Comment Find(int id)
        {
            return this.repository.Find(id);
        }

        /// <summary>
        /// Deletes a specific comment.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
        public int Delete(Models.Comment tobject)
        {
            return this.repository.Delete(tobject);
        }

        /// <summary>
        /// Creates a list of comments.
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
        public IEnumerable<Models.Comment> CreateAll(IEnumerable<Models.Comment> tobjects)
        {
            return this.repository.CreateAll(tobjects);
        }
    }
}