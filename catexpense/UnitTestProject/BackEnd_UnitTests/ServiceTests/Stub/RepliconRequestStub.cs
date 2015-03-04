using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests.Stub
{
    public class RepliconRequestStub : RepliconRequest
    {
        public override JObject PerformApiRequest(JObject apiAction)
        {
            JObject obj = new JObject();
            obj["method"] = "PerformApiRequest";
            return obj;
        }

        public override HttpWebRequest SetupApiCredentials()
        {
            HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create("http://www.foo.com");
            return httpWebRequest;
        }

        public override JObject SetupGetAllProjectsQuery()
        {
            JObject obj = new JObject();
            obj["method"] = "SetupGetAllProjects";
            return obj;
        }

        public override JObject SetupGetAllUsersQuery()
        {
            JObject obj = new JObject();
            obj["method"] = "SetupGetAllUsers";
            return obj;
        }

        public override JObject SetupGetOneProjectQuery(int id)
        {
            JObject obj = new JObject();
            obj["method"] = "SetupGetOneProject";
            return obj;
        }
    }
}
