using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Class used to make a request to the replicon api.  
    /// </summary>
    public class RepliconRequest
    {
        private const string APIURL = "https://na1.replicon.com/a/RemoteAPI/RemoteAPI.ashx/8.29.23/";
        private const string COMPANYNAME = "CatalystIT";
        private const string LOGINNAME = "rservice";
        private const string PASSWORD = "I7cKdOOsXHMeusQssTKd";

        private static readonly JsonSerializer jsonSerializer = new JsonSerializer();

        /// <summary>
        /// Setup the Replicon query to get information for all projects
        /// </summary>
        /// <returns></returns>
        public JObject SetupGetAllProjectsQuery()
        {
            JObject apiLoad = new JObject();
     
            
            JObject apiAction = new JObject();
            apiAction["Action"] = "Query";
            apiAction["QueryType"] = "ProjectAll";
            apiAction["DomainType"] = "Replicon.Project.Domain.Project";
            apiAction["Args"] = new JArray();
            apiAction["Load"] = new JArray() { JObject.FromObject(new { Relationship = "ProjTeamUsers", DomainType = "Replicon.Domain.User" }), 
                                               JObject.FromObject(new { Relationship = "ProjectLeader", DomainType = "Replicon.Domain.User" }) };
           // apiAction["SortBy"] = new JArray() { "LoginName" };
            //apiAction["QueryType"] = "ExpenseProjectsByUser";
           // apiAction["DomainType"] = "Replicon.Project.Domain.Project";
           // apiAction["Args"] = new JArray() {JObject.FromObject(new {__type= "Replicon.Domain.User",  Identity = "1" })};
            //apiAction["SortBy"] = new JArray() { "LoginName" };
          

            return apiAction;
        }


 
        /// <summary>
        /// Setup the Replicon query to get information for all users
        /// </summary>
        /// <returns></returns>
        public JObject SetupGetAllUsersQuery()
        {
            JObject apiAction = new JObject();
            apiAction["Action"] = "Query";
            apiAction["QueryType"] = "ProjectAll";
            apiAction["DomainType"] = "Replicon.Domain.User";
            apiAction["Args"] = new JArray();
            apiAction["SortBy"] = new JArray() { "LoginName" };

            return apiAction;
        }

        /// <summary>
        /// Setup the Replicon query to get information for one project
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JObject SetupGetOneProjectQuery(int id)
        {
            JObject apiLoad = new JObject();
            apiLoad["Relationship"] = "ProjectLeader";
            apiLoad["DomainType"] = "Replicon.Domain.User";

            JObject apiAction = new JObject();
            apiAction["Action"] = "Query";
            apiAction["QueryType"] = "ProjectByIds";
            apiAction["DomainType"] = "Replicon.Project.Domain.Project";
            apiAction["Args"] = (JArray)JsonConvert.DeserializeObject("[[" + id + "]]");
            apiAction["Load"] = new JArray(apiLoad);

            return apiAction;
        }

        /// <summary>
        /// Setup the Replicon credentials needed for the api calls
        /// </summary>
        /// <returns></returns>
        public HttpWebRequest SetupApiCredentials()
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(APIURL);
            request.Credentials = new NetworkCredential(COMPANYNAME + "\\" + LOGINNAME, PASSWORD);
            request.PreAuthenticate = true; // send auth on first request 
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            return request;
        }

        /// <summary>
        /// Perform the API request
        /// </summary>
        /// <param name="apiAction"></param>
        /// <returns>Deserialized response from Replicon</returns>
        public JObject PerformApiRequest(JObject apiAction)
        {
            HttpWebRequest request = this.SetupApiCredentials();
            JObject responseInfo = null;

            // Send API request in JSON format 
            using (Stream requestStream = request.GetRequestStream())
            using (StreamWriter writer = new StreamWriter(requestStream, Encoding.UTF8))
                jsonSerializer.Serialize(writer, apiAction);

            // Receive API request and convert into JSON objects 
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream responseStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(response.CharacterSet)))
                responseInfo = (JObject)jsonSerializer.Deserialize(new JsonTextReader(reader));
            return responseInfo;
        }
    }
}