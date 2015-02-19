using System.Web.Http;
using System.Web.Mvc;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using Microsoft.Practices.Unity;
using Unity.Mvc4;

using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;

namespace CatExpenseFront
{
    /// <summary>
    /// 
    /// </summary>
    public static class Bootstrapper
    {
        /// <summary>
        /// Iniialises the bootstrapper
        /// </summary>
        /// <returns></returns>
        public static IUnityContainer Initialise()
        {
            var container = BuildUnityContainer();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);

            return container;
        }

        /// <summary>
        /// Builds the container
        /// </summary>
        /// <returns></returns>
        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            // register all your components with the container here

            RegisterTypes(container);

            return container;
        }

        /// <summary>
        /// Registers the types.
        /// </summary>
        /// <param name="container"></param>
        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IRepository<FinanceApprover>, Repository<FinanceApprover>>();
            container.RegisterType<IRepository<LineItem>, Repository<LineItem>>();
            container.RegisterType<IRepository<Error>, Repository<Error>>();
            container.RegisterType<IRepository<Comment>, Repository<Comment>>();
            container.RegisterType<IRepository<Submission>, Repository<Submission>>();
            container.RegisterType<IRepository<ExpenseCategory>, Repository<ExpenseCategory>>();
            container.RegisterType<IRepliconUserProjectService, RepliconUserProjectService>();
            container.RegisterType<IErrorService, ErrorService>();
            container.RegisterType<ISubmissionService, SubmissionService>();
            container.RegisterType<ILineItemService, LineItemService>();
            container.RegisterType<IExpenseCategoryService, ExpenseCategoryService>();
            container.RegisterType<IFinanceApproverService, FinanceApproverService>();
            container.RegisterType<ICommentService, CommentService>();
            container.RegisterType<IReceiptService, ReceiptService>();
            container.RegisterType<IRepliconService, RepliconService>();
        }

    }
}