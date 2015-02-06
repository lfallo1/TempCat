using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using System.Web;
using CatExpenseFront.Utilities;
using CatExpenseFront.Controllers.Base;

namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Crud for comments
    /// </summary>
    public class CommentController : BaseController
    {
        private ICommentService service;

        /// <summary>
        /// Default Constructor
        /// </summary>
        public CommentController()
        {
            service = new CommentService();
        }

        /// <summary>
        /// Construcor that accepts comment service and user service.
        /// </summary>
        /// <param name="iService"></param>
        /// <param name="userService"></param>
        public CommentController(ICommentService iService, IRepliconUserService userService)
        {
            if (service == null)
            {
                service = iService;
            }
        }



        /// <summary>
        /// Returns comment by comment id
        /// GET api/Comment?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(Comment))]
        public IHttpActionResult GetCommentById(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            Comment Comment = service.Find(id);
            if (Comment == null)
            {
                return NotFound();
            }

            return Ok(Comment);
        }


        /// <summary>
        /// returns Comments by submission Id
        /// GET api/Comment/GetCommentsBySubmissionId?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetCommentsBySubmissionId")]
        [Route("api/Comment/GetCommentsBySubmissionId")]
        public IEnumerable<Comment> GetCommentsBySubmissionId(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<Comment> Comments = new List<Comment>();

            Comments = (from m in service.All()
                        where (m.SubmissionId == id)
                        select m).OrderBy(s => s.DateCreated).ToList();

            return Comments;

        }




        /// <summary>
        /// Updates a single comment.
        /// PUT api/Comment?id={id}&comment={comment}
        /// </summary>
        /// <param name="id"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
        [HttpPut]
        [ActionName("PutComment")]
        [Route("api/Comment/PutComment")]
        public HttpResponseMessage PutComment(int id, string comment)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            Comment Comment = service.Find(id);
            string currentUser = (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString().ToLower());
            if (Comment.RepliconUserName.ToLower() == currentUser)
            {
                Comment.DateUpdated = DateTime.Now;
                Comment.ExpenseComment = comment;
                service.Update(Comment);
                service.SaveChanges();
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }


        /// <summary>
        /// Creates a new comment
        /// POST api/Comment/CreateComment?submissionId={submissionId}&comment={comment}
        /// </summary>
        /// <param name="submissionId"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
        [HttpPost]
        [ActionName("CreateComment")]
        [Route("api/Comment/CreateComment")]
        public Comment CreateComment(int submissionId, string comment)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            Comment Comment = new Comment();

            Comment.SubmissionId = submissionId;
            var userName = (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString());

            Comment.RepliconUserName = userName;
            Comment.ExpenseComment = comment;
            Comment.DateCreated = DateTime.Now;
            Comment.DateUpdated = DateTime.Now;
            service.Create(Comment);
            service.SaveChanges();
            return Comment;
        }

        // DELETE api/Comment/5
        /// <summary>
        /// Delete a comment by comment Id
        /// DELETE api/Comment/DeleteComment?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [ActionName("DeleteComment")]
        [Route("api/Comment/DeleteComment")]
        public HttpResponseMessage DeleteComment(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            Comment comment = service.Find(id);
            string currentUser = (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString().ToUpper());
            if (comment == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            if (comment.RepliconUserName.ToUpper() == currentUser)
            {
                service.Delete(comment);
                service.SaveChanges();
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }
            return Request.CreateResponse(HttpStatusCode.OK, comment);
        }

    }
}
