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

        public TempCatExpenseContext()
            : base("name=CATEXPENSEConnectionString")
        {

        }

        public DbSet<FinanceApprover> FinanceApprovers { get; set; }

        public DbSet<SubmissionPage> SubmissionPages { get; set; }


        public DbSet<LineItem> LineItems { get; set; }

        public DbSet<Submission> Submissions { get; set; }

        public DbSet<RepliconProject> RepliconProjects { get; set; }

        public DbSet<RepliconUser> RepliconUsers { get; set; }

        public DbSet<RepliconUserProject> RepliconUserProjects { get; set; }

        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }

        public DbSet<Receipt> Receipts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FinanceApprover>().ToTable("dbo.FinanceApprovers");

            modelBuilder.Entity<SubmissionPage>().ToTable("dbo.Submission_V");
            modelBuilder.Entity<SubmissionPage>().MapToStoredProcedures(s =>
                s.Update(u => u.HasName("dbo.spSubmissionUpdate"))
                 .Insert(i => i.HasName("dbo.spSubmissionInsert")));

        }
    }
}
