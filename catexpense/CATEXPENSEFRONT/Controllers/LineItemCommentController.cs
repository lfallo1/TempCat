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
    /// Crud for line item comments
    /// </summary>
    public class LineItemCommentController : BaseController
    {
        private ILineItemCommentService service;

        /// <summary>
        /// Default Constructor
        /// </summary>
        public LineItemCommentController()
        {
            service = new LineItemCommentService();
        }

        /// <summary>
        /// Construcor that accepts line item comment service and user service.
        /// </summary>
        /// <param name="iService"></param>
        /// <param name="userService"></param>
        public LineItemCommentController(ILineItemCommentService iService, IRepliconUserService userService)
        {
            if (service == null)
            {
                service = iService;
            }
        }



        /// <summary>
        /// Returns Line item comment by line item comment id
        /// GET api/LineItemComment?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(LineItemComment))]
        public IHttpActionResult GetLineItemComment(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            LineItemComment lineItemComment = service.Find(id);
            if (lineItemComment == null)
            {
                return NotFound();
            }

            return Ok(lineItemComment);
        }


        /// <summary>
        /// returns Comments by line Item Id
        /// GET api/LineItem/GetLineItemCommentsBySubmissionId?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetLineItemCommentsBySubmissionId")]
        [Route("api/LineItem/GetLineItemCommentsBySubmissionId")]
        public IEnumerable<LineItemComment> GetLineItemCommentsBySubmissionId(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<LineItemComment> lineItemComments = new List<LineItemComment>();

            lineItemComments = (from m in service.All()
                                where (m.SubmissionId == id)
                                select m).OrderBy(s => s.DateCreated).ToList();

            return lineItemComments;

        }




        /// <summary>
        /// Updates a single line item comment.
        /// PUT api/LineItemComment?id={id}&comment={comment}
        /// </summary>
        /// <param name="id"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
        [HttpPut]
        [ActionName("PutLineItemComment")]
        [Route("api/LineItem/PutLineItemComment")]
        public HttpResponseMessage PutLineItemComment(int id, string comment)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            LineItemComment lineItemComment = service.Find(id);
            string currentUser = (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString().ToLower());
            if (lineItemComment.RepliconUserName.ToLower() == currentUser)
            {
                lineItemComment.DateUpdated = DateTime.Now;
                lineItemComment.ExpenseComment = comment;
                service.Update(lineItemComment);
                service.SaveChanges();
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }


        /// <summary>
        /// Creates a new line item comment
        /// POST api/LineItem/CreateLineItemComment?submissionId={submissionId}&comment={comment}
        /// </summary>
        /// <param name="submissionId"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
        [HttpPost]
        [ActionName("CreateLineItemComment")]
        [Route("api/LineItem/CreateLineItemComment")]
        public LineItemComment CreateLineItemComment(int submissionId, string comment)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            LineItemComment lineItemComment = new LineItemComment();

            lineItemComment.SubmissionId = submissionId;
            var userName = (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString());

            lineItemComment.RepliconUserName = userName;
            lineItemComment.ExpenseComment = comment;
            lineItemComment.DateCreated = DateTime.Now;
            lineItemComment.DateUpdated = DateTime.Now;
            service.Create(lineItemComment);
            service.SaveChanges();
            return lineItemComment;
        }

        // DELETE api/LineItemComment/5
        /// <summary>
        /// Delete a line item comment by comment Id
        /// DELETE api/LineItem/DeleteLineItemComment?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [ActionName("DeleteLineItemComment")]
        [Route("api/LineItem/DeleteLineItemComment")]
        public HttpResponseMessage DeleteLineItemComment(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            LineItemComment lineItemComment = service.Find(id);
            string currentUser = (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString().ToUpper());
            if (lineItemComment == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            if (lineItemComment.RepliconUserName.ToUpper() == currentUser)
            {
                service.Delete(lineItemComment);
                service.SaveChanges();
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }
            return Request.CreateResponse(HttpStatusCode.OK, lineItemComment);
        }

    }
}
