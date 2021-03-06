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
using Newtonsoft.Json.Linq;

using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using System.Web;
using CatExpenseFront.Controllers.Base;
using System.DirectoryServices.AccountManagement;
using CatExpenseFront.App_Start;


namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Controller used to return replicon projects and update project list.
    /// </summary>
    public class RepliconProjectController : BaseController
    {

        public IRepliconUserProjectService userProjectService;
        public IFinanceApproverService financeApproverService;
        public RepliconRequest repliconRequest;
        public RepliconResponse repliconResponse;

        /// <summary>
        /// Constructor that accepts service as a parameter
        /// </summary>
        /// <param name="service"></param>
        public RepliconProjectController()
        {
            if (this.userProjectService == null)
            {
                this.userProjectService = new RepliconUserProjectService();
                this.financeApproverService = new FinanceApproverService(new Repository<FinanceApprover>());
                this.repliconRequest = new RepliconRequest();
                this.repliconResponse = new RepliconResponse();
            }
        }

        /// <summary>
        /// Constructor that accepts all services as parameters for testing purposes
        /// </summary>
        public RepliconProjectController(IRepliconUserProjectService iProjectService, IFinanceApproverService iFinance,
            RepliconRequest repRequest, RepliconResponse repResponse)
        {
            this.userProjectService = iProjectService;
            this.financeApproverService = iFinance;
            this.repliconRequest = repRequest;
            this.repliconResponse = repResponse;
        }



        /// <summary>
        /// Returns all projects for the current user.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("RepliconProject")]
        [Route("api/RepliconProject")]
        public List<RepliconUserProject> GetRepliconProject()
        {
            //Checks the session to see if it is valid
            this.checkSession();


            return (from m in userProjectService.All()
                    where (m.UserName.ToUpper() == (null == HttpContextFactory.Current.Session["UserName"]
                                                   ? ""
                                                   : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper()))
                    select m).ToList<RepliconUserProject>();
        }



        /// <summary>
        /// This will update the db with the projects it is missing from the replicon db
        /// </summary>
        [HttpPost]
        [ActionName("UpdateRepliconProjectTable")]
        [Route("api/RepliconProject/UpdateRepliconProjectTable")]
        public void UpdateTable()
        {
            //Checks the session to see if it is valid
            this.checkSession();

            JObject apiAction = repliconRequest.SetupGetAllProjectsQuery();
            JObject response = repliconRequest.PerformApiRequest(apiAction);
            JArray responseValue = repliconResponse.GetResponseValue(response);
            // gets all of the projects from the replicon db
            List<RepliconUserProject> projectList = repliconResponse.CreateAllProjectsList(responseValue);

            //Delete existing user projects
            List<RepliconUserProject> existingUserProjects = userProjectService.All().ToList<RepliconUserProject>();

            foreach (RepliconUserProject up in existingUserProjects)
            {
                userProjectService.Delete(up);
            }

            //Commit the delete
            userProjectService.SaveChanges();

            //Update User projects
            userProjectService.CreateAll(projectList);
            userProjectService.SaveChanges();



            UpdateFinanceApprovers();
        }


        /// <summary>
        /// Search through the group.Members property until you have a Principal that you want. Then extract the name like this:
        /// </summary>
        public void UpdateFinanceApprovers()
        {
            PrincipalContext principalContext = new PrincipalContext(ContextType.Domain);
            GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, "Finance");

            //Get the existing approvers from the database
            List<FinanceApprover> approvers = (from m in financeApproverService.All()
                                               select m).ToList<FinanceApprover>();

            //Delete all existing
            foreach (FinanceApprover approver in approvers)
            {
                financeApproverService.Delete(approver);
            }

            //Create new approvers
            foreach (Principal principal in group.Members)
            {
                FinanceApprover fa = new FinanceApprover();
                fa.Username = principal.SamAccountName.ToUpper();
                financeApproverService.Create(fa);

            }

            financeApproverService.SaveChanges();
        }
    }
}
