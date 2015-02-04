using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;

namespace Logger
{
    public class Logger
    {

        protected const string Warning = " WARN ";
        protected const string Info = " INFO ";
        protected const string Error = " ERROR";
        protected const string Start = " START";
        protected const string Finish = " FNSHD";
        protected const string Pass = " PASS ";
        protected const string Fail = " FAIL ";
        protected const string Time = " TIME ";
        protected const string Message = " -----";
        protected const string DashedLine = "-------------------------------------------------";
        private const string MessageFormat = "{0}{1}- {2}";

        private static readonly Dictionary<string, Logger> LoggerDict = new Dictionary<string, Logger>();
        private string logDir = @"C:\CatExpenseLogs\";
        private string logFilePath;


        /** TestLogger GetLogger(string descriptiveLogName)
         * 
         * @param - descriptive name of log.
         * ie. TestDetails, DatabaseCalls, etc.
         * 
         * Shows up in logDir/DATE_descriptiveLogName.txt
         * 
         * This method uses a modified Singleton Design Pattern.
         * In the Singleton Design Pattern, the constructor is set to private,
         * and there is a static GetObject method and a private static instance
         * of that object. For instance, in the normal Singleton Pattern, I
         * would create a private static _logger, and the GetLogger() method
         * would call the constructor if _logger is null before sending back
         * _logger, or just simply return _logger if it has already been
         * constructed. 
         * 
         * In this modified version of the Singleton Desing Pattern, we have a
         * private static List<Logger>, and when GetLogger() is called, it 
         * checks that list to see if it's already created, before returning it,
         * creating it if neccessary.
         */
        public static Logger GetLogger(string descriptiveLogName)
        {
            Logger loggerInst;
            if (!LoggerDict.ContainsKey(descriptiveLogName))
            {
                loggerInst = new Logger(descriptiveLogName);
                LoggerDict.Add(descriptiveLogName, loggerInst);
            }
            return LoggerDict[descriptiveLogName];
        }


        private Logger(string descriptiveLogName)
        {
            CreateLogDirectory();
            var datetime = DateTime.Now;
            this.logFilePath = string.Format("{0}{1}_{2}.txt",
                    logDir,
                    datetime.ToString("yyyy-MM-dd"),
                    descriptiveLogName);

            if (!File.Exists(this.logFilePath))
            {
                WriteStartMessage(datetime);
            }
        }

        private void CreateLogDirectory()
        {
            if (!Directory.Exists(logDir))
            {
                Directory.CreateDirectory(logDir);
            }
        }

        public void WriteStartMessage(DateTime datetime)
        {
            using (var outfile = new StreamWriter(logFilePath))
            {
                outfile.WriteLine(
                    datetime.ToString("HH:mm:ss") + " ------ Starting Log...");
            }
        }

        private void Log(string message, string level)
        {
            string log;
            var datetime = DateTime.Now;

            using (var sr = new StreamReader(logFilePath))
            {
                log = sr.ReadToEnd();
            }
            using (var outfile = new StreamWriter(logFilePath))
            {
                outfile.Write(log);
                outfile.WriteLine(MessageFormat,
                    datetime.ToString("HH:mm:ss"), level, message);
            }
        }

        public void LogMessage(string message)
        {
            Log(message, Message);
        }

        public void LogError(string errorMessage)
        {
            Log(errorMessage, Error);
        }

        public void LogWarning(string warningMessage)
        {
            Log(warningMessage, Warning);
        }

        public void LogInfo(string infoMessage)
        {
            Log(infoMessage, Info);
        }

        public void LogStartTestSuite(string testClassName)
        {
            Log(DashedLine, Message);
            Log(string.Format("Starting Test Suite in {0}!", testClassName), Start);
        }

        public void LogStartTest(string testName)
        {
            Log(DashedLine, Message);
            Log(testName + "() started!", Start);
            Log(DashedLine, Message);
        }

        public void LogPass(string testName)
        {
            Log(testName + "() passed!", Pass);
        }

        public void LogFail(string testName)
        {
            Log(testName + "() failed.", Fail);
        }

        public void LogFinishTestSuite()
        {
            Log(DashedLine, Message);
            Log("Finished Test Suite!", Finish);
            Log(DashedLine, Message);
        }

        public void LogTime(string message, TimeSpan timeSpan)
        {
            Log(string.Format("{0}: {1}",
                message, timeSpan), Time);
        }
    }
}
