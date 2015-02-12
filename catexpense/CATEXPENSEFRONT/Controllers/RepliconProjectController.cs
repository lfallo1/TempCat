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
using Newtonsoft.Json.Linq;

using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using System.Web;
using CatExpenseFront.Controllers.Base;
using System.DirectoryServices.AccountManagement;


namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Controller used to return replicon projects and update project list.
    /// </summary>
    public class RepliconProjectController : BaseController
    {
   
        public IRepliconUserProjectService userProjectService;
        public IFinanceApproverService financeApproverService;


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
            }
        }

        

        /// <summary>
        /// Returns all projects for the current user.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("RepliconProject")]
        [Route("api/RepliconProject")]
        public List<RepliconProjectContainer> GetRepliconProject()
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<RepliconProjectContainer> returnContainer = new List<RepliconProjectContainer>();
            List<RepliconUserProject> projects = (from m in userProjectService.All()
                                                  where (m.UserName.ToUpper() == (null == HttpContext.Current.Session["UserName"]
                                                                                 ? ""
                                                                                 : HttpContext.Current.Session["UserName"].ToString().ToUpper()))
                                                  select m).ToList<RepliconUserProject>();

            foreach (RepliconUserProject project in projects)
            {
                returnContainer.Add(new RepliconProjectContainer(project));
            }

            return returnContainer;
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

            JObject apiAction = RepliconRequest.SetupGetAllProjectsQuery();
            JObject response = RepliconRequest.PerformApiRequest(apiAction);
            JArray responseValue = RepliconResponse.GetResponseValue(response);
            // gets all of the projects from the replicon db
            List<RepliconProjectContainer> projectList = RepliconResponse.CreateAllProjectsList(responseValue);

            //Delete existing user projects
            List<RepliconUserProject> existingUserProjects = userProjectService.All().ToList<RepliconUserProject>();

            foreach (RepliconUserProject up in existingUserProjects)
            {
                userProjectService.Delete(up);
            }

            //Commit the delete
            userProjectService.SaveChanges();

            // loop through all of the projects in the replicon db
            foreach (RepliconProjectContainer project in projectList)
            {
                //Update User projects
                userProjectService.CreateAll(project.TeamMembers);
                userProjectService.SaveChanges();

            }

            UpdateFinanceApprovers();
        }


        /// <summary>
        /// Search through the group.Members property until you have a Principal that you want. Then extract the name like this:
        /// </summary>
        private void UpdateFinanceApprovers()
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
                fa.userName = principal.SamAccountName.ToUpper();
                financeApproverService.Create(fa);

            }

            financeApproverService.SaveChanges();
        }
    }
}
