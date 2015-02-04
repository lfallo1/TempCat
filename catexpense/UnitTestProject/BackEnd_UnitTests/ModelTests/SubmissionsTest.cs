using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class SubmissionsTest
    {
        [Test]
        public void SubmissionConstructorTest()
        {
            Submission submission = new Submission();
            Assert.IsNotNull(submission);
            if (submission.GetType() != typeof(Submission))
            {
                Assert.Fail("submission is not of type Submission!");
            }
        }
    }
}
