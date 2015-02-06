using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using Quartz;
using CatExpenseFront.Utilities;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;

namespace CatExpenseFront.Controllers
{
    ///<summary>
    ///This class is used to create an email-reminder for managers to approve submitted reports.
    ///It is created as a IJob to allow quartz to schedule this class' events to execute every day
    ///at midnight.
    ///</summary>
    public class EmailController : IJob
    {
        private ISubmissionService submissionRepo;
        private ILineItemService lineItemRepo;
        private const string SUBJECT = "Reminder";

        ///<summary>
        ///Class constructor to handle parameters to set the fields.
        ///</summary>
        public EmailController(ISubmissionService submissionRepo, ILineItemService lineItemRepo)
        {
            this.lineItemRepo = lineItemRepo;
            this.submissionRepo = submissionRepo;
        }

        public EmailController()
        {
            submissionRepo = new SubmissionService();
            lineItemRepo = new LineItemService();
        }
        /// <summary>
        /// This method is used to search through the DB and find all submissions with a status of 2.
        /// Once the records are collected, it searches through to find all the records with an updated date of
        /// 3, 5, 7, 9, and 11 days before the current day. The appropriate records will be used to find the proper manager 
        /// to contact via email to remind them to approve/reject the submission.
        /// </summary>
        /// <param name="context"></param>
        public void Execute(IJobExecutionContext context)
        {
            // get a list of submissions with a status of 2, which means awaiting approval.
            List<Submission> submissionList = (from m in submissionRepo.All()
                                               where m.StatusId == 2 && !m.IsDeleted
                                               select m).ToList();

            Dictionary<string, string> emailManagerList = GenerateMessage(submissionList);

            SendEmails(emailManagerList);
        }
        public Dictionary<string, string> GenerateMessage(List<Submission> submissionList)
        {
            // get the current date.
            DateTime currentDate = DateTime.Now;
            var validDifferences = new List<int>() { 3, 5, 7, 9, 11 };
            Dictionary<string, string> emailManagerList = new Dictionary<string, string>();
            List<LineItem> lineItemList;

            // go through all the retrieved submissions and look for an updated date within 3, 5, 7, 9, and 11 days.
            foreach (Submission submission in submissionList)
            {
                TimeSpan ts = currentDate - submission.DateUpdated;
                int differenceInDays = ts.Days;

                if (validDifferences.Contains(differenceInDays))
                {
                    // once you find the proper submissions, grab the manager object to retrieve the proper information to email them
                    lineItemList = (from m in lineItemRepo.All()
                                    where m.SubmissionId == submission.SubmissionId
                                    select m).ToList();
                    StringBuilder record = new StringBuilder(string.Empty);
                    record.Append("Please check on the status of the report submitted by ");
                    record.Append(submission.ActiveDirectoryUser);
                    record.AppendLine(".");
                    foreach (LineItem lineItem in lineItemList)
                    {
                        record.AppendLine(string.Format("Record - Data: Billable: " + lineItem.Billable + " \nDate Created: " + lineItem.DateCreated + " \nDescription: " + lineItem.LineItemDesc + "\n"));
                    }
                    emailManagerList.Add(submission.ManagerName, record.ToString());
                }
            }
            return emailManagerList;
        }
        public void SendEmails(Dictionary<string, string> emailManagerList)
        {
            var fromAddress = new MailAddress("CatalystExpense@catalystitservices.com", "From Catalyst");
            const string Subject = "Reminder";
            var smtp = new SmtpClient
            {
                Host = "mail.catalystsolves.com",
                Port = 2112,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = true,
            };
            foreach (KeyValuePair<string, string> kvp in emailManagerList)
            {
                var toAddress = new MailAddress("jfinamore" + "@catalystitservices.com", "touser@email.com");
                using (var email = new MailMessage(fromAddress, toAddress)
                {
                    Subject = Subject,
                    Body = kvp.Value
                })
                {
                    smtp.Send(email);
                }
            }

        }
    }
}