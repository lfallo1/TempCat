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
    [JsonObject(IsReference = false)]
    public class LineItem
    {
        public LineItem()
        {
            this.Receipts = new HashSet<Receipt>();
        }

        /// <summary>
        /// Updates Specific fields
        /// </summary>
        /// <param name="li"></param>
        public void  UpdateFields(LineItem li) {
            this.Billable = li.Billable;
            this.LineItemDate = li.LineItemDate;
            this.LineItemDesc = li.LineItemDesc;
            this.LineItemAmount = li.LineItemAmount;
            this.ReceiptPresent = li.ReceiptPresent;
            this.DateUpdated = DateTime.Now;
        }


        public int LineItemId { get; set; }
        public int SubmissionId { get; set; }
        public bool Billable { get; set; }
        public int ExpenseCategoryId { get; set; }
        public System.DateTime LineItemDate { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string LineItemDesc { get; set; }
        public decimal LineItemAmount { get; set; }
        public bool ReceiptPresent { get; set; }
        public int StatusId { get; set; }
        public System.DateTime DateCreated { get; set; }
        public System.DateTime DateUpdated { get; set; }
        public Nullable<System.DateTime> ManagerApproverDate { get; set; }
        public Nullable<System.DateTime> FinanceApproverDate { get; set; }

        
        public virtual ExpenseCategory ExpenseCategory { get; set; }
        public virtual ICollection<Receipt> Receipts { get; set; }
        
        public virtual Status Status { get; set; }

        public string LineItemMetadata
        {
            get
            {
                return SubmissionMetadata.MakeString();
            }
            set
            {
                SubmissionMetadata.SetMetadata(value);
            }
        }
    }
}
