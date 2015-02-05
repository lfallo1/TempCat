using System;
using System.Configuration;
using System.DirectoryServices;
using CatExpenseFront.Models;
using LOGGER = Logger.Logger;
using System.Web.Http;
using System.Web;
using System.Collections.Generic;
using CatExpenseFront.Services.Interfaces;
using System.Linq;
using CatExpenseFront.Utilities;
using System.Net.Http;
using System.Net;
using CatExpenseFront.Services;

namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Controller used to login and logout
    /// </summary>
    public class LoginController : ApiController
    {
        private ISubmissionService service;
        private IFinanceApproverService approverService;

        /// <summary>
        /// Construcor that accepts submission service and user service
        /// </summary>
        /// <param name="service"></param>
        /// <param name="iService"></param>
        public LoginController(ISubmissionService service, IFinanceApproverService iApproverService)
        {
            this.service = service;
            this.approverService = iApproverService;
        }

        /// <summary>
        /// Default Construcor
        /// </summary>
        public LoginController()
        {
            this.service = new SubmissionService();
            this.approverService = new FinanceApproverService();

        }

        /// <summary>
        /// Logs the user in by username and password
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost]
        [ActionName("Login")]
        [Route("api/login/userlogin")]
        public UserWithSession userLoginSetSession(Login login)
        {
            UserWithSession userWithSession = new UserWithSession();
            try
            {
                string domainPath = "LDAP://DC=catalystsolves,DC=com";
                DirectoryEntry searchRoot = new DirectoryEntry(domainPath, login.Username, login.Password);
                DirectorySearcher search = new DirectorySearcher(searchRoot);
                search.Filter = "(sAMAccountName=" + login.Username + ")";
                search.PropertiesToLoad.Add("samaccountname"); // account name
                search.PropertiesToLoad.Add("mail");
                search.PropertiesToLoad.Add("givenname"); // first name
                search.PropertiesToLoad.Add("displayname"); // full name
                search.PropertiesToLoad.Add("sn"); // last name
                search.PropertiesToLoad.Add("manager"); // manager
                SearchResult result = search.FindOne();
                HttpContext.Current.Session["UserName"] = result.Properties["samaccountname"][0].ToString();
                userWithSession.userName = HttpContext.Current.Session["UserName"].ToString();
                userWithSession.isLoggedIn = true;
                userWithSession.isFinanceApprover = isFinanceApprover();
                userWithSession.isManager = isManager();
                return userWithSession;
            }
            catch (DirectoryServicesCOMException e)
            {
                // Bad Password/Username
                LOGGER.GetLogger("StackTrace").LogError(e.ToString());
                return userWithSession;
            }
        }

        /// <summary>
        /// Checks to see if the user is logged in.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("isLoggedIn")]
        [Route("api/login/isLoggedIn")]
        public UserWithSession isLoggedIn()
        {
            UserWithSession userWithSession = new UserWithSession();
            if (null != HttpContext.Current.Session["UserName"])
            {
                userWithSession.userName = HttpContext.Current.Session["UserName"].ToString();
                userWithSession.isLoggedIn = true;
                userWithSession.isFinanceApprover = isFinanceApprover();
                userWithSession.isManager = isManager();
            }
            else
            {
                userWithSession.userName = "";
                userWithSession.isLoggedIn = false;
                userWithSession.isFinanceApprover = false;
                userWithSession.isManager = false;
            }
            return userWithSession;
        }

        /// <summary>
        /// Logs the user out
        /// </summary>
        [HttpPost]
        [ActionName("Logout")]
        [Route("api/login/userLogout")]
        public void userLogout()
        {
            HttpContext.Current.Session.Abandon();
        }

        /// <summary>
        /// Checks to see if the user is a manager of any project.
        /// </summary>
        /// <returns></returns>
        private bool isManager()
        {
            return (from m in service.All()
                            where m.ManagerName.ToUpper() == (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString().ToUpper())
                            select m).Count() > 0;
        }

        /// <summary>
        /// Checks to see if the user is a finace approver.
        /// </summary>
        /// <returns></returns>
        private bool isFinanceApprover()
        {
            return (from m in approverService.All()
                         where (m.userName.ToUpper() == (null == HttpContext.Current.Session["UserName"]
                                                          ? ""
                                                          : HttpContext.Current.Session["UserName"].ToString()).ToUpper())
                         select m).Count() > 0;
        }
    }
}