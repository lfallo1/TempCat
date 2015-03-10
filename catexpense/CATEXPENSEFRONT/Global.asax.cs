using System.Data.Entity;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using CatExpenseFront.Controllers;
using CatExpenseFront.Repository;
using Quartz;
using Quartz.Impl;
using System;
using System.Web;
using System.Web.SessionState;
using CatExpenseFront.App_Start;
using CatExpenseFront.Models;

namespace CatExpenseFront
{
   
    /// <summary>
    ///  Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    ///  visit http://go.microsoft.com/?LinkId=9394801
    /// </summary>
    public class WebApiApplication : System.Web.HttpApplication
    {
        /// <summary>
        /// Runs when the application starts.
        /// </summary>
        protected void Application_Start()
        {
            // scheduler for an email service
            IScheduler scheduler = StdSchedulerFactory.GetDefaultScheduler();
            scheduler.Start();
            // the job is (EmailController) which will run periodically
            IJobDetail job = JobBuilder.Create<EmailController>().Build();
            // this trigger fires every day at noon (HourAndMinuteOfDay(12, 0))
            ITrigger trigger = TriggerBuilder.Create()
                .WithDailyTimeIntervalSchedule
                  (s =>
                     s.WithIntervalInHours(24)
                    .OnEveryDay()
                    .StartingDailyAt(TimeOfDay.HourAndMinuteOfDay(14, 51))
                  )
                .Build();

            scheduler.ScheduleJob(job, trigger);

            Database.SetInitializer<CatExpenseContext>(null);
            AreaRegistration.RegisterAllAreas();


            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            Bootstrapper.Initialise();
            HttpContextFactory.Current.SetSessionStateBehavior(SessionStateBehavior.Required);

        }

        /// <summary>
        /// PostAuthorizeRequest
        /// </summary>
        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContextFactory.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            }
        }

        /// <summary>
        /// IsWebApiRequest
        /// </summary>
        /// <returns></returns>
        private bool IsWebApiRequest()
        {
            return HttpContextFactory.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiConfig.UrlPrefixRelative);
        }
    }
}