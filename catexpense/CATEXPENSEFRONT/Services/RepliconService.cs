using System.Collections.Generic;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Services
{
    public class RepliconService : IRepliconService
    {
        public RepliconService()
        { }

        public Newtonsoft.Json.Linq.JObject SetUpGetAllProjectsQuery()
        {
            return RepliconRequest.SetupGetAllProjectsQuery();
        }

        public Newtonsoft.Json.Linq.JObject SetupGetAllUsersQuery()
        {
            return RepliconRequest.SetupGetAllUsersQuery();
        }

        public Newtonsoft.Json.Linq.JObject SetupGetOneProjectQuery(int id)
        {
            return RepliconRequest.SetupGetOneProjectQuery(id);
        }

        public System.Net.HttpWebRequest SetupApiCredentials()
        {
            return RepliconRequest.SetupApiCredentials();
        }

        public Newtonsoft.Json.Linq.JObject PerformApiRequest(Newtonsoft.Json.Linq.JObject actionObject)
        {
            return RepliconRequest.PerformApiRequest(actionObject);
        }

        public List<Models.RepliconUser> CreateAllUsersList(Newtonsoft.Json.Linq.JArray users)
        {
            return RepliconResponse.CreateAllUsersList(users);
        }

        public List<Models.RepliconProjectContainer> CreateAllProjectsList(Newtonsoft.Json.Linq.JArray projects)
        {
            return RepliconResponse.CreateAllProjectsList(projects);
        }

        public List<Models.Client> CreateAllProjectsClientList(Newtonsoft.Json.Linq.JArray projects)
        {
            return RepliconResponse.CreateAllProjectsClientList(projects);
        }

        public Newtonsoft.Json.Linq.JArray GetResponseValue(Newtonsoft.Json.Linq.JObject response)
        {
            return RepliconResponse.GetResponseValue(response);
        }


        List<RepliconProjectContainer> IRepliconService.CreateAllProjectsList(Newtonsoft.Json.Linq.JArray projects)
        {
            throw new System.NotImplementedException();
        }
    }
}