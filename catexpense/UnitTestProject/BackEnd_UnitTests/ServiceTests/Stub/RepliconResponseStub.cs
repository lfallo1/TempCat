using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests.Stub
{
    class RepliconResponseStub : RepliconResponse
    {
        public override List<RepliconUserProject> CreateAllProjectsList(Newtonsoft.Json.Linq.JArray projects)
        {
            return new List<RepliconUserProject>();
        }

        public override JArray GetResponseValue(JObject response)
        {
            return new JArray();
        }
    }
}
