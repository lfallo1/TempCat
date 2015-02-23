using System.Data.Entity;

namespace CatExpenseFront.Models
{
    public class TempCatExpenseContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.

        /// <summary>
        /// Constructor that sets the connection string.
        /// </summary>
        public TempCatExpenseContext()
            : base("name=CATEXPENSEConnectionString")
        {

        }

        /// <summary>
        /// Loads the Finannce Approvers to the context.
        /// </summary>
        public DbSet<FinanceApprover> FinanceApprovers { get; set; }

        /// <summary>
        /// Loasds Line Items to the Context.
        /// </summary>
        public DbSet<LineItem> LineItems { get; set; }

        /// <summary>
        /// Loads submissions to the context.
        /// </summary>
        public DbSet<Submission> Submissions { get; set; }

        /// <summary>
        /// Loads user projects to the context.
        /// </summary>
        public DbSet<RepliconUserProject> RepliconUserProjects { get; set; }

        /// <summary>
        /// Loads categories to the context.
        /// </summary>
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }

        /// <summary>
        /// Loads Reciepts to the context.
        /// </summary>
        public DbSet<Receipt> Receipts { get; set; }

        
    }
}
