using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class SubmissionPage : PageObjectBase
    {
        // header fields
        private static readonly By WeekendingDateInput = By.Id("datePickerInput");
        private static readonly By clientDropDownList = By.Id("clientDropDownList");
        private static readonly By submissionDescription = By.Id("submissionDescription");
        private static readonly By submissionManager = By.Id("submissionManager");
        private static readonly By submissionStatus = By.Id("submissionStatus");

        public SubmissionPage(IWebDriver driver)
            : base(driver)
        {
        }

        #region Header controls
        /// <summary>
        /// Get text value from the Weekending Date input.
        /// 
        /// NOTE:  Not actually the real value, but a parallel property set in angular.
        /// </summary>
        /// <returns></returns>
        public string GetWeekendingDate()
        {
            return Find(WeekendingDateInput).Text;
        }

        /// <summary>
        /// Determine the client currently selected by the client dropdown.
        /// </summary>
        /// <returns></returns>
        public string GetSelectedClient()
        {
            return Find(clientDropDownList).Text;
        }

        /// <summary>
        /// Select a specific client from the client dropdown.
        /// </summary>
        /// <param name="client">name of client to select</param>
        /// <returns></returns>
        public SubmissionPage SelectClient(string client)
        {
            SelectByText(clientDropDownList, client);

            return this;
        }

        /// <summary>
        /// Get the description of the currently selected submission.
        /// </summary>
        /// <returns></returns>
        public string GetDescription()
        {
            return Find(submissionDescription).Text;
        }

        /// <summary>
        /// Type a description into the submission description field.
        /// </summary>
        /// <param name="description"></param>
        /// <returns></returns>
        public SubmissionPage SetDescription(string description)
        {
            SendKeys(submissionDescription, description);

            return this;
        }

        /// <summary>
        /// Get the name of the manager of the currently selected submission.
        /// </summary>
        /// <returns></returns>
        public string GetManager()
        {
            return Find(submissionManager).Text;
        }

        /// <summary>
        /// Get the status of the currently selected submission
        /// </summary>
        /// <returns></returns>
        public string GetStatus()
        {
            return Find(submissionStatus).Text;
        }
        #endregion
    }
}
