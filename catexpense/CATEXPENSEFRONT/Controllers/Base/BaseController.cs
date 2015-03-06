using CatExpenseFront.App_Start;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CatExpenseFront.Controllers.Base
{
    /// <summary>
    /// Base controller used for security
    /// </summary>
    public abstract class BaseController : ApiController
    {
        /// <summary>
        /// Throws an exception if the session is null
        /// </summary>
        protected void checkSession()
        {
            if (null == HttpContextFactory.Current.Session["UserName"])
            {
                 throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.Unauthorized));
            
            }

        }

    }
}