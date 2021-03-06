﻿using System;
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
using System.Web;
using CatExpenseFront.Services;
using CatExpenseFront.Controllers.Base;
using CatExpenseFront.App_Start;

namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Controller used for handling submisions or expense reports
    /// </summary>
    public class SubmissionController : BaseController
    {
        private const string APPROVAL_STATUS_FINANCE_APPROVED = "Finance Approved";
        private const string APPROVAL_STATUS_FINANCE_REJECTED = "Finance Rejected";
        private const string APPROVAL_STATUS_MANAGER_APPROVED = "Manager Approved";
        private const string APPROVAL_STATUS_MANAGER_REJECTED = "Manager Rejected";
        private const string APPROVAL_STATUS_IN_PROGRESS = "In Progress";
        private const string APPROVAL_STATUS_SUBMITTED = "Submitted";
        private const int APPROVAL_STATUS_IN_PROGRESS_ID = 1;
        private const int APPROVAL_STATUS_SUBMITTED_ID = 2;
        private const int APPROVAL_STATUS_MANAGER_APPROVED_ID = 3;
        private const int APPROVAL_STATUS_MANAGER_REJECTED_ID = 4;
        private const int APPROVAL_STATUS_FINANCE_APPROVED_ID = 5;
        private const int APPROVAL_STATUS_FINANCE_REJECTED_ID = 6;


        private ISubmissionService service;
        private IRepliconUserProjectService userProjectService;
     
        private ICommentService commentsService;
        private IFinanceApproverService financeApproverService;

        /// <summary>
        /// Construcor that accepts submission service
        /// </summary>
        /// <param name="service"></param>
        public SubmissionController(ISubmissionService service)
        {
            if (this.service == null)
            {
                this.service = service;
               
                userProjectService = new RepliconUserProjectService(new Repository<RepliconUserProject>());
                commentsService = new CommentService();
                financeApproverService = new FinanceApproverService(new Repository<FinanceApprover>());
            }
        }

        /// <summary>
        /// Consructor that accepts submission service, user service and line item comments service
        /// </summary>
        /// <param name="service"></param>
        /// <param name="userService"></param>
        /// <param name="iService"></param>
        public SubmissionController(ISubmissionService service, ICommentService iService)
        {
            if (this.service == null)
            {
                this.service = service;
              
                commentsService = iService;
                userProjectService = new RepliconUserProjectService(new Repository<RepliconUserProject>());
                financeApproverService = new FinanceApproverService(new Repository<FinanceApprover>());
            }


        }
        public SubmissionController(ISubmissionService service, ICommentService cService, IRepliconUserProjectService rService, IFinanceApproverService fService)
        {
            this.service = service;
            commentsService = cService;
            userProjectService = rService;
            financeApproverService = fService;
        }
        /// <summary>
        /// Default Constructor
        /// </summary>
        public SubmissionController()
        {
            this.service = new SubmissionService();
            commentsService = new CommentService();
            userProjectService = new RepliconUserProjectService(new Repository<RepliconUserProject>());
            financeApproverService = new FinanceApproverService(new Repository<FinanceApprover>());
        }

        /// <summary>
        /// Returns all submissions by the current user. /api/Submissions
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetSubmissions")]
        [Route("api/Submissions")]
        public List<Submission> GetUserSubmissions()
        {
            //Checks the session to see if it is valid
            this.checkSession();
            List<Submission> submissionList = (from m in service.All()
                                               where m.ActiveDirectoryUser.ToUpper() == (null == HttpContextFactory.Current.Session["UserName"]
                                                                                ? ""
                                                                                : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper()) && !m.IsDeleted
                                               select m).OrderByDescending(s => s.WeekEndingDate).ToList();

            CalculateTotalsForList(submissionList);

            return submissionList;
        }


        /// <summary>
        /// DELETE api/Submissions?id={id}  Logically deletes a submission
        /// </summary>
        /// <param name="id">The id of the submission</param>
        /// <returns>A status code 200 if successful.</returns>
        [HttpDelete]
        [ActionName("DelelteSubmission")]
        [Route("api/Submissions")]
        public HttpResponseMessage DeleteSubmission(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            HttpResponseMessage message = Request.CreateResponse(HttpStatusCode.OK);
            Submission submission = service.Find(id);
            if (submission == null)
            {
                message.StatusCode = HttpStatusCode.NotFound;
            }
            else
            {
                //Get the current user
                String currentUser = null == HttpContextFactory.Current.Session["UserName"]
                                                               ? ""
                                                               : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper();
                //Check to see if the user is a finace approver
                bool isFinanceApprover = IsFinanceApprover(currentUser);

                //If the user is a finace approver, manager of the submission or the current user, a delete flag can be set.  
                if (isFinanceApprover || submission.ActiveDirectoryUser.ToUpper() == currentUser || submission.ManagerName == currentUser)
                {
                    submission.IsDeleted = true;
                    service.Update(submission);
                    service.SaveChanges();
                }
                else
                {
                    message.StatusCode = HttpStatusCode.Forbidden;
                }

            }

            return message;
        }


        /// <summary>
        /// Returns a list of manager submissions.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetPendingSubmissionsByManagerName")]
        [Route("api/Submission/GetPendingSubmissionsByManagerName")]
        public List<Submission> GetPendingSubmissionsByManagerName()
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<Submission> submissionList = new List<Submission>();

            submissionList = (from m in service.All()
                              where (m.ManagerName.ToUpper() == (null == HttpContextFactory.Current.Session["UserName"]
                                                               ? ""
                                                               : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper())
                              && (m.Status.StatusName.ToUpper() == APPROVAL_STATUS_SUBMITTED.ToUpper()
                              || m.Status.StatusName.ToUpper() == APPROVAL_STATUS_MANAGER_APPROVED.ToUpper()
                              || m.Status.StatusName.ToUpper() == APPROVAL_STATUS_MANAGER_REJECTED.ToUpper())
                              && !m.IsDeleted)
                              select m).OrderBy(s => s.WeekEndingDate).ToList();

            CalculateTotalsForList(submissionList);

            return submissionList;
        }

        /// <summary>
        /// Returns a list finance submissions
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetPendingSubmissionsByFinanceApprover")]
        [Route("api/Submission/GetPendingSubmissionsByFinanceApprover")]
        public List<Submission> GetPendingSubmissionsByFinanceApprover()
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<Submission> submissionList = new List<Submission>();

            int count = (from m in userProjectService.All()
                         where (m.UserName.ToUpper() == (null == HttpContextFactory.Current.Session["UserName"]
                                                               ? ""
                                                               : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper()))
                         select m).ToList<RepliconUserProject>().Count;
            if (count > 0)
            {
                submissionList = (from m in service.All()
                                  where ((m.Status.StatusName.ToUpper() == APPROVAL_STATUS_MANAGER_APPROVED.ToUpper() ||
                                  m.Status.StatusName.ToUpper() == APPROVAL_STATUS_FINANCE_REJECTED.ToUpper() ||
                                  m.Status.StatusName.ToUpper() == APPROVAL_STATUS_FINANCE_APPROVED.ToUpper()) && !m.IsDeleted)
                                  select m).OrderBy(s => s.WeekEndingDate).ToList();

                CalculateTotalsForList(submissionList);
            }

            return submissionList;
        }





        /// <summary>
        /// POST api/Submission
        /// </summary>
        /// <param name="submission"> A new Submission Object</param>
        /// <returns>Status code 201 if successful</returns>
        [ResponseType(typeof(Submission))]
        public HttpResponseMessage Post(Submission submission)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            submission.DateCreated = DateTime.Now;
            submission.DateUpdated = DateTime.Now;
            submission.ActiveDirectoryUser = HttpContextFactory.Current.Session["UserName"].ToString();
            service.Create(submission);
            service.SaveChanges();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, submission);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = submission.SubmissionId }));
            HttpContextFactory.Current.Session["SubmissionId"] = submission.SubmissionId;
            return response;
        }


        /// <summary>
        /// Updates the status for a submission
        /// </summary>
        /// <param name="id">The id of the sumbmission</param>
        /// <param name="status">The new status</param>
        /// <param name="comment">The reject comment</param>
        /// <returns>A status code</returns>
        [HttpPut]
        [ActionName("UpdateSubmissionStatus")]
        [Route("api/Submissions")]
        public HttpResponseMessage UpdateSubmission(int id, Submission submission)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            //Gets The replicon UseName
            string Username = (null == HttpContextFactory.Current.Session["UserName"]
           ? ""
           : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper());

            Comment comment = new Comment();
           
            comment.RepliconUserName = Username;
            comment.ExpenseComment = submission.Comments.First<Comment>().ExpenseComment;
            comment.DateCreated = DateTime.Now;
            comment.DateUpdated = DateTime.Now;
         

            HttpResponseMessage message = Request.CreateResponse(HttpStatusCode.OK);
            Submission mergedSubmission = service.Find(id);

           
            int userId = (from m in userProjectService.All()
                          where m.UserName.ToUpper() == Username
                          select m.ID).First();

            mergedSubmission.Description = submission.Description;
            mergedSubmission.WeekEndingDate = submission.WeekEndingDate;
            mergedSubmission.RepliconProjectId = submission.RepliconProjectId;
            switch (submission.Status.StatusName)
            {

                case APPROVAL_STATUS_IN_PROGRESS:
                    {
                        if (Username == submission.ActiveDirectoryUser.ToUpper())
                        {
                            mergedSubmission.StatusId = APPROVAL_STATUS_IN_PROGRESS_ID;
                            mergedSubmission.DateUpdated = DateTime.Now;

                        }
                        break;
                    }
                case APPROVAL_STATUS_SUBMITTED:
                    {
                        if (Username == mergedSubmission.ActiveDirectoryUser.ToUpper())
                        {
                            mergedSubmission.StatusId = APPROVAL_STATUS_SUBMITTED_ID;
                            mergedSubmission.DateUpdated = DateTime.Now;
                        }
                        break;
                    }
                case APPROVAL_STATUS_MANAGER_APPROVED:
                    {
                        if (Username == mergedSubmission.ManagerName.ToUpper())
                        {
                            mergedSubmission.StatusId = APPROVAL_STATUS_MANAGER_APPROVED_ID;
                            mergedSubmission.RepliconManagerApproverDate = DateTime.Now;
                            mergedSubmission.DateUpdated = DateTime.Now;
                        }
                        break;
                    }
                case APPROVAL_STATUS_MANAGER_REJECTED:
                    {
                        if (Username == mergedSubmission.ManagerName.ToUpper())
                        {
                            mergedSubmission.StatusId = APPROVAL_STATUS_MANAGER_REJECTED_ID;
                            mergedSubmission.RepliconManagerApproverDate = DateTime.Now;
                           
                        }
                        break;
                    }
                case APPROVAL_STATUS_FINANCE_APPROVED:
                    {
                        if (IsFinanceApprover(Username))
                        {
                            mergedSubmission.StatusId = APPROVAL_STATUS_FINANCE_APPROVED_ID;
                            mergedSubmission.RepliconFinanceApproverDate = DateTime.Now;
                            mergedSubmission.DateUpdated = DateTime.Now;
                        }
                        break;
                    }
                case APPROVAL_STATUS_FINANCE_REJECTED:
                    {
                        if (IsFinanceApprover(Username))
                        {
                            mergedSubmission.StatusId = APPROVAL_STATUS_FINANCE_REJECTED_ID;
                            mergedSubmission.RepliconFinanceApproverDate = DateTime.Now;
                           
                        }
                        break;
                    }
            }

            //Only save the comment if it was sent.
            if (comment.ExpenseComment != null) {
                comment.StatusId = mergedSubmission.StatusId;
                comment.SubmissionId = id;
                commentsService.Create(comment);
                commentsService.SaveChanges();
            }
            
            service.Update(mergedSubmission);
            service.SaveChanges();


            return message;
        }


        /// <summary>
        /// Aggregates the total for a submission
        /// </summary>
        /// <param name="submissionList"></param>
        private void CalculateTotalsForList(List<Submission> submissionList)
        {

            foreach (Submission submission in submissionList)
            {
                List<RepliconUserProject> up = (from m in userProjectService.All()
                                                where (m.ProjectId == submission.RepliconProjectId)
                                                select m).ToList<RepliconUserProject>();
                if (up.Count > 0)
                {
                    submission.RepliconProject = up[0];

                }
                else
                {
                    submission.RepliconProject = new RepliconUserProject();
                }

                decimal total = 0;
                ICollection<LineItem> lineItems = submission.LineItems;
                foreach (LineItem lineItem in lineItems)
                {
                    total += lineItem.LineItemAmount;
                }
                submission.TotalAmount = total;
            }

        }

        /// <summary>
        /// return true if current user is a finance approver
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        private bool IsFinanceApprover(string currentUser)
        {
            //Check to see if the user is a finace approver
            return (from m in financeApproverService.All()
                    where (m.Username.ToUpper() == currentUser)
                    select m).Count() > 0;
        }
    }
}
