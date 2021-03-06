﻿using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using CatExpenseFront.Utilities;

namespace CatExpenseFront.Models
{
    public class CatExpenseContext : DbContext
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
        public CatExpenseContext()
            : base("name=CATEXPENSEConnectionString")
        {

        }

        /// <summary>
        /// Loads the Errors to the context.
        /// </summary>
        public DbSet<Error> Errors { get; set; }

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
        /// <summary>
        /// Loads QbClients to the context.
        /// </summary>
        public DbSet<QbClient> QbClients { get; set; }
        /// <summary>
        /// Loads QbVendor to the context.
        /// </summary>
        public DbSet<QbVendor> QbVendor { get; set; }


        //public void Dispose()
        //{
        //    base.Dispose();
        //}

        //public int SaveChanges()
        //{
        //    return base.SaveChanges();
        //}

        //public DbEntityEntry Entry(object entity)
        //{
        //    return base.Entry(entity);

        //}

        //public DbContextConfiguration Configuration
        //{
        //    get { return base.Configuration; }
        //}

        /// <summary>
        /// Loads QbVendor to the context.
        /// </summary>
        public DbSet<QbAccount> QbAccount { get; set; }
    }
}
