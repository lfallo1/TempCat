

using CatExpenseFront.Models;
using NUnit.Framework;
namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class SubmissionMetadataTest
    {
        [Test]
        public void SetSubmissionMetadataTest()
        {
            var subMDstring = "Miles:13000,Origin:Earth,Destination:Mars," +
            "Sunday:true,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false,ThisShouldTestDefault:case";

            SubmissionMetadata.SetMetadata(subMDstring);

            Assert.AreEqual(13000, SubmissionMetadata.Miles);
            Assert.AreEqual("Earth", SubmissionMetadata.Origin);
            Assert.AreEqual("Mars", SubmissionMetadata.Destination);
            Assert.AreEqual("true", SubmissionMetadata.Sunday);
            Assert.AreEqual("false", SubmissionMetadata.Monday);
            Assert.AreEqual("false", SubmissionMetadata.Tuesday);
            Assert.AreEqual("false", SubmissionMetadata.Wednesday);
            Assert.AreEqual("false", SubmissionMetadata.Thursday);
            Assert.AreEqual("false", SubmissionMetadata.Friday);
            Assert.AreEqual("false", SubmissionMetadata.Saturday);


            var cleanedMDstring = "Miles:13000,Origin:Earth,Destination:Mars," +
            "Sunday:true,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false";

            Assert.AreEqual(cleanedMDstring, SubmissionMetadata.MakeString());
        }
    }
}
