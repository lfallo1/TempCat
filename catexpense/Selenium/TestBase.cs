using System;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using NUnit.Framework;
using OpenQA.Selenium;
using LOGGER = Logger.Logger;

namespace Selenium
{
    public class TestBase : SeleniumDriver
    {

        private Stopwatch suiteStopWatch;
        private Stopwatch testStopwatch;
        private static string logName = "TestDetails";
        private string screenshotDir = ConfigurationManager.AppSettings["screenshotDirectory"];

        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {
            LOGGER.GetLogger(logName).LogStartTestSuite(TestContext.CurrentContext.Test.FullName);
            
            suiteStopWatch = Stopwatch.StartNew();
        }

        [SetUp]
        public void TestSetUp()
        {
            LOGGER.GetLogger(logName).LogStartTest(TestContext.CurrentContext.Test.Name);
            testStopwatch = Stopwatch.StartNew();
        }

        [TearDown]
        public void TestTearDown()
        {
            var context = TestContext.CurrentContext;
            if (context.Result.Status == TestStatus.Passed)
            {
                LOGGER.GetLogger(logName).LogPass(context.Test.Name);
            }
            else
            {
                LOGGER.GetLogger(logName).LogFail(context.Test.Name);
                TakeScreenShot();
            }
            testStopwatch.Stop();
            LOGGER.GetLogger(logName).LogTime("Elapsed Time", testStopwatch.Elapsed);
            WebDriver.Quit();
            WebDriver = null;
        }

        private void TakeScreenShot()
        {
            CreateScreenshotDirectoryIfNotExists();
            var ss = ((ITakesScreenshot)WebDriver).GetScreenshot();
            var sslocation = string.Format(@"{0}{1}_{2}.jpeg",
                    screenshotDir,
                    DateTime.Now.ToString("yyyy-MM-dd"),
                    TestContext.CurrentContext.Test.Name);
            ss.SaveAsFile(sslocation, System.Drawing.Imaging.ImageFormat.Jpeg);
            LOGGER.GetLogger(logName).LogInfo(string.Format("Screenshot saved at {0}", sslocation));
        }

        private void CreateScreenshotDirectoryIfNotExists()
        {
            if (!Directory.Exists(screenshotDir))
            {
                Directory.CreateDirectory(screenshotDir);
            }
        }

        [TestFixtureTearDown]
        public void TestFixtureTearDown()
        {
            LOGGER.GetLogger(logName).LogFinishTestSuite();
            suiteStopWatch.Stop();
            LOGGER.GetLogger(logName).LogTime("Total Time", suiteStopWatch.Elapsed);
        }
    }
}
