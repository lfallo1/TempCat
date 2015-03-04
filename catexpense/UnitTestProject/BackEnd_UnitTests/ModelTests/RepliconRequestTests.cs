using System.Net;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class RepliconRequestTests
    {
        RepliconRequest repliconRequest = new RepliconRequest();
        [Test]
        public void SetupGetAllProjectsQueryTest()
        {
            var jobject = repliconRequest.SetupGetAllProjectsQuery();

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }

        [Test]
        public void SetupGetAllUsersQueryTest()
        {
            var jobject = repliconRequest.SetupGetAllUsersQuery();

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }

        [Test]
        public void SetupGetOneProjectQueryTest()
        {
            var jobject = repliconRequest.SetupGetOneProjectQuery(1);

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }

        [Test]
        public void SetupApiCredentialsTest()
        {
            var request = repliconRequest.SetupApiCredentials();

            Assert.IsNotNull(request);
            Assert.AreSame(request.GetType(), typeof(HttpWebRequest));
        }

        [Test]
        public void PerformApiRequestTest()
        {
            var jobject = repliconRequest.PerformApiRequest(new JObject());

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }
    }
}
