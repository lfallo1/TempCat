using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Model used to Hold Line Items.
    /// </summary>
    [JsonObject(IsReference = false)]
    public class LineItem
    {
        
        /// <summary>
        /// Default Constructor
        /// </summary>
        public LineItem()
        {
            this.Receipts = new HashSet<Receipt>();
        }

        /// <summary>
        /// Updates Specific fields
        /// </summary>
        /// <param name="li"></param>
        public void UpdateFields(LineItem li)
        {
            this.Billable = li.Billable;
            this.LineItemDate = li.LineItemDate;
            this.LineItemDesc = li.LineItemDesc;
            this.LineItemAmount = li.LineItemAmount;
            this.ReceiptPresent = li.ReceiptPresent;
            this.DateUpdated = DateTime.Now;
            this.LineItemMetadata = li.LineItemMetadata;
        }

        /// <summary>
        /// The Id of the Line item
        /// </summary>
        public int LineItemId { get; set; }
        
        /// <summary>
        /// The parent SubmissionId
        /// </summary>
        public int SubmissionId { get; set; }
        
        /// <summary>
        /// Flag set if the line item is billable.
        /// </summary>
        public bool Billable { get; set; }

        /// <summary>
        /// The category Id of the line item.
        /// </summary>
        public int ExpenseCategoryId { get; set; }
        
        /// <summary>
        /// The date that the line item was actually expensed.
        /// </summary>
        public System.DateTime LineItemDate { get; set; }
        
        /// <summary>
        /// The description of the line item.
        /// </summary>
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string LineItemDesc { get; set; }
        
        /// <summary>
        /// The dollar amount of the line item.
        /// </summary>
        public decimal LineItemAmount { get; set; }
        
        /// <summary>
        /// Has a reciept been attached.
        /// </summary>
        public bool ReceiptPresent { get; set; }
        
        /// <summary>
        /// The status of The line item.  
        /// </summary>
        public int StatusId { get; set; }
        
        /// <summary>
        /// The date that the line item was created.
        /// </summary>
        public System.DateTime DateCreated { get; set; }
       
        /// <summary>
        /// The date the line item was updated.
        /// </summary>
        public System.DateTime DateUpdated { get; set; }
        
        /// <summary>
        /// The date that manager approved the line item.
        /// </summary>
        public Nullable<System.DateTime> ManagerApproverDate { get; set; }
        
        /// <summary>
        /// The date that finace approved the line item.  
        /// </summary>
        public Nullable<System.DateTime> FinanceApproverDate { get; set; }

        /// <summary>
        /// The category of the line item.
        /// </summary>
        public virtual ExpenseCategory ExpenseCategory { get; set; }
        
        /// <summary>
        /// The reciepts that are attached to the line item.
        /// </summary>
        public virtual ICollection<Receipt> Receipts { get; set; }

        /// <summary>
        /// The status of the line item.  
        /// </summary>
        public virtual Status Status { get; set; }


        /// <summary>
        /// The metadata associated with a line item.
        /// </summary>
        public string LineItemMetadata { get; set; }
    }
}
