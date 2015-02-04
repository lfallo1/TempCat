using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    [JsonObject(IsReference = false)]
    public class Submission
    {
        public Submission()
        {
            this.LineItems = new HashSet<LineItem>();
            this.LineItemComments = new HashSet<LineItemComment>();
        }

        public int SubmissionId { get; set; }
        public string Description { get; set; }
        public int RepliconProjectId { get; set; }
        public string ActiveDirectoryUser { get; set; }
        public System.DateTime WeekEndingDate { get; set; }
        public Nullable<System.DateTime> RepliconManagerApproverDate { get; set; }
        public Nullable<int> RepliconFinanceApproverId { get; set; }
        public Nullable<System.DateTime> RepliconFinanceApproverDate { get; set; }
        public int StatusId { get; set; }
        public System.DateTime DateCreated { get; set; }
        public System.DateTime DateUpdated { get; set; }
        public Boolean IsDeleted { get; set; }

       
        public virtual ICollection<LineItem> LineItems { get; set; }
        public virtual ICollection<LineItemComment> LineItemComments { get; set; }

        [ForeignKey("RepliconProjectId")]
        public virtual RepliconProject RepliconProject { get; set; }

        public string ManagerName { get; set; }
        
        [ForeignKey("RepliconFinanceApproverId")]
        public virtual RepliconUser RepliconUserFinance { get; set; }
        public virtual Status Status { get; set; }

        [NotMapped]
        public decimal TotalAmount { get; set; }
    }
}