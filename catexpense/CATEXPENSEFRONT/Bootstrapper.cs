using System.Web.Http;
using System.Web.Mvc;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using Microsoft.Practices.Unity;
using Unity.Mvc4;
using CatExpenseFront.Utilities;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;

namespace CatExpenseFront
{
    public static class Bootstrapper
    {
        public static IUnityContainer Initialise()
        {
            var container = BuildUnityContainer();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);

            return container;
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            // register all your components with the container here
               
            RegisterTypes(container);

            return container;
        }

        public static void RegisterTypes(IUnityContainer container)
        {
            
                container.RegisterType<IRepository<SubmissionPage>, Repository<SubmissionPage>>();
                container.RegisterType<IRepository<Client>, Repository<Client>>();
                container.RegisterType<IRepository<Expense>, Repository<Expense>>();
                container.RegisterType<IRepository<FinanceApprover>, Repository<FinanceApprover>>();
                container.RegisterType<IRepository<LineItem>, Repository<LineItem>>();
                container.RegisterType<IRepository<Comment>, Repository<Comment>>();
                container.RegisterType<IRepository<Submission>, Repository<Submission>>();
                container.RegisterType<IRepository<RepliconProject>, Repository<RepliconProject>>();
                container.RegisterType<IRepository<RepliconUser>, Repository<RepliconUser>>();
                container.RegisterType<IRepository<ExpenseCategory>, Repository<ExpenseCategory>>();
                container.RegisterType<IRepository<Receipt>, Repository<Receipt>>();
                container.RegisterType<IRepliconUserService, RepliconUserService>();
                container.RegisterType<IRepliconUserProjectService, RepliconUserProjectService>();
                container.RegisterType<IClientService, ClientService>();
                container.RegisterType<IRepliconProjectService, RepliconProjectService>();
                container.RegisterType<ISubmissionService, SubmissionService>();
                container.RegisterType<ILineItemService, LineItemService>();
                container.RegisterType<IExpenseCategoryService, ExpenseCategoryService>();
                container.RegisterType<IExpenseService, ExpenseService>();
                container.RegisterType<IFinanceApproverService, FinanceApproverService>();
                container.RegisterType<ICommentService, CommentService>();
                container.RegisterType<IReceiptService, ReceiptService>();
                container.RegisterType<ISubmissionPageService, SubmissionPageService>();
                container.RegisterType<IRepliconService, RepliconService>();
        }

    }
}