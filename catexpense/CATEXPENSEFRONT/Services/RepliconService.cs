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
        private RepliconRequest repliconRequest;
        private RepliconResponse repliconResponse;
        /// <summary>
        /// Default Constructor
        /// </summary>
        public RepliconService()
        {
            repliconRequest = new RepliconRequest();
            repliconResponse = new RepliconResponse();
        }

        /// <summary>
        /// Builds the all project query.
        /// </summary>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject SetUpGetAllProjectsQuery()
        {
            return repliconRequest.SetupGetAllProjectsQuery();
        }

        /// <summary>
        /// Builds the all user query.
        /// </summary>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject SetupGetAllUsersQuery()
        {
            return repliconRequest.SetupGetAllUsersQuery();
        }

        /// <summary>
        /// Returns one project by project id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject SetupGetOneProjectQuery(int id)
        {
            return repliconRequest.SetupGetOneProjectQuery(id);
        }

        /// <summary>
        /// Builds credentials.
        /// </summary>
        /// <returns></returns>
        public System.Net.HttpWebRequest SetupApiCredentials()
        {
            return repliconRequest.SetupApiCredentials();
        }

        /// <summary>
        /// Call the server api.
        /// </summary>
        /// <param name="actionObject"></param>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JObject PerformApiRequest(Newtonsoft.Json.Linq.JObject actionObject)
        {
            return repliconRequest.PerformApiRequest(actionObject);
        }


        /// <summary>
        /// returns all projects.
        /// </summary>
        /// <param name="projects"></param>
        /// <returns></returns>
        public List<RepliconUserProject> CreateAllProjectsList(Newtonsoft.Json.Linq.JArray projects)
        {
            return repliconResponse.CreateAllProjectsList(projects);
        }

       

        /// <summary>
        /// parses the response from the api.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public Newtonsoft.Json.Linq.JArray GetResponseValue(Newtonsoft.Json.Linq.JObject response)
        {
            return repliconResponse.GetResponseValue(response);
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