using System.Collections.Generic;
using System.Net;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;

namespace CatExpenseFront.Services.Interfaces
{
    /// <summary>
    /// Interface used to contact the replicon api.  
    /// </summary>
    public interface IRepliconService
    {
        /// <summary>
        /// Returns a JSOn Object that will return all projects.
        /// </summary>
        /// <returns></returns>
        JObject SetUpGetAllProjectsQuery();

        /// <summary>
        /// Returns a JSOn object that willl return all users.
        /// </summary>
        /// <returns></returns>
        JObject SetupGetAllUsersQuery();

        /// <summary>
        /// Returns a json object that will get a project by project id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        JObject SetupGetOneProjectQuery(int id);

        /// <summary>
        /// Sets up the credentials for authentication.
        /// </summary>
        /// <returns></returns>
        HttpWebRequest SetupApiCredentials();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionObject"></param>
        /// <returns></returns>
        JObject PerformApiRequest(JObject actionObject);



        /// <summary>
        /// 
        /// </summary>
        /// <param name="projects"></param>
        /// <returns></returns>
        List<RepliconUserProject> CreateAllProjectsList(JArray projects);

      

        /// <summary>
        /// 
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        JArray GetResponseValue(JObject response);


    }
}