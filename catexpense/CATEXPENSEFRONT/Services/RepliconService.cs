using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    /// <summary>
    /// Implimentation of RepliconService
    /// </summary>
    public class RepliconService : IRepliconService
    {
        /// <summary>
        /// Default Constructor
        /// </summary>
        public RepliconService()
        { }

        /// <summary>
        /// Builds the all project query.
        /// </summary>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject SetUpGetAllProjectsQuery()
        {
            return RepliconRequest.SetupGetAllProjectsQuery();
        }

        /// <summary>
        /// Builds the all user query.
        /// </summary>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject SetupGetAllUsersQuery()
        {
            return RepliconRequest.SetupGetAllUsersQuery();
        }

        /// <summary>
        /// Returns one project by project id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject SetupGetOneProjectQuery(int id)
        {
            return RepliconRequest.SetupGetOneProjectQuery(id);
        }

        /// <summary>
        /// Builds credentials.
        /// </summary>
        /// <returns></returns>
        public System.Net.HttpWebRequest SetupApiCredentials()
        {
            return RepliconRequest.SetupApiCredentials();
        }

        /// <summary>
        /// Call the server api.
        /// </summary>
        /// <param name="actionObject"></param>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject PerformApiRequest(Newtonsoft.Json.Linq.JObject actionObject)
        {
            return RepliconRequest.PerformApiRequest(actionObject);
        }


        /// <summary>
        /// returns all projects.
        /// </summary>
        /// <param name="projects"></param>
        /// <returns></returns>
        public List<RepliconUserProject> CreateAllProjectsList(Newtonsoft.Json.Linq.JArray projects)
        {
            return RepliconResponse.CreateAllProjectsList(projects);
        }

       

        /// <summary>
        /// parses the response from the api.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JArray GetResponseValue(Newtonsoft.Json.Linq.JObject response)
        {
            return RepliconResponse.GetResponseValue(response);
        }

        /// <summary>
        /// Not implimented.
        /// </summary>
        /// <param name="projects"></param>
        /// <returns></returns>
        List<RepliconUserProject> IRepliconService.CreateAllProjectsList(Newtonsoft.Json.Linq.JArray projects)
        {
            throw new System.NotImplementedException();
        }
    }
}