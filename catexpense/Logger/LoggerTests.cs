using System;
using System.IO;
using NUnit.Framework;
using LOGGER = Logger.Logger;

namespace Logger
{
    [TestFixture]
    public class LoggerTests
    {
        private Logger logger = LOGGER.GetLogger("TestLogger");

        [Test]
        public void LogTest()
        {
            logger.WriteStartMessage(DateTime.Now);
            logger.LogMessage("Logging Message");
            logger.LogError("Logging Error");
            logger.LogWarning("Logging Warning");
            logger.LogInfo("Logging Info");
            logger.LogStartTestSuite("Logging Start of Test Suite");
            logger.LogStartTest("Logging Start of Test");
            logger.LogFail("Logging Failure");
            logger.LogPass("Logging Pass");
            logger.LogTime("Loggin timespan of 3 minutes", TimeSpan.FromMinutes(3));
            logger.LogFinishTestSuite();
        }

        [TestFixtureTearDown]
        public void TearDown()
        {
            if (Directory.Exists(@"C:\CatExpenseLogs"))
            {
                Directory.Delete(@"C:\CatExpenseLogs", true);
            }
        }
    }
}
