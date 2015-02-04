using System.Collections.Generic;
using System.Net;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;

namespace CatExpenseFront.Services.Interfaces
{
    public interface IRepliconService 
    {
        JObject SetUpGetAllProjectsQuery();

        JObject SetupGetAllUsersQuery();

        JObject SetupGetOneProjectQuery(int id);

        HttpWebRequest SetupApiCredentials();

        JObject PerformApiRequest(JObject actionObject);

        List<RepliconUser> CreateAllUsersList(JArray users);

        List<RepliconProjectContainer> CreateAllProjectsList(JArray projects);

        List<Client> CreateAllProjectsClientList(JArray projects);

        JArray GetResponseValue(JObject response);


    }
}