using System.Net;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class RepliconRequestTests
    {
        [Test]
        public void SetupGetAllProjectsQueryTest()
        {
            var jobject = RepliconRequest.SetupGetAllProjectsQuery();

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }

        [Test]
        public void SetupGetAllUsersQueryTest()
        {
            var jobject = RepliconRequest.SetupGetAllUsersQuery();

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }

        [Test]
        public void SetupGetOneProjectQueryTest()
        {
            var jobject = RepliconRequest.SetupGetOneProjectQuery(1);

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }

        [Test]
        public void SetupApiCredentialsTest()
        {
            var request = RepliconRequest.SetupApiCredentials();

            Assert.IsNotNull(request);
            Assert.AreSame(request.GetType(), typeof(HttpWebRequest));
        }

        [Test]
        public void PerformApiRequestTest()
        {
            var jobject = RepliconRequest.PerformApiRequest(new JObject());

            Assert.IsNotNull(jobject);
            Assert.AreSame(jobject.GetType(), typeof(JObject));
        }
    }
}
