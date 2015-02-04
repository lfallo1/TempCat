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

namespace CatExpenseFront
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801


    public class WebApiApplication : System.Web.HttpApplication
    {
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
                    .StartingDailyAt(TimeOfDay.HourAndMinuteOfDay(16, 18))
                  )
                .Build();

            scheduler.ScheduleJob(job, trigger);

            Database.SetInitializer<DB>(null);
            AreaRegistration.RegisterAllAreas();


            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            Bootstrapper.Initialise();
            System.Web.HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);

        }

        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            }
        }

        private bool IsWebApiRequest()
        {
            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiConfig.UrlPrefixRelative);
        }
    }
}