using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// The submission Model.
    /// </summary>
    [JsonObject(IsReference = false)]
    public class Submission
    {
        /// <summary>
        /// Default Constructor
        /// </summary>
        public Submission()
        {
            this.LineItems = new HashSet<LineItem>();
            this.Comments = new HashSet<Comment>();
        }

        /// <summary>
        /// The id of the submission.
        /// </summary>
        public int SubmissionId { get; set; }

        /// <summary>
        /// The desciption of the submission.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// The replicon project Id.
        /// </summary>
        public int RepliconProjectId { get; set; }

        /// <summary>
        /// The active directory user name.
        /// </summary>
        public string ActiveDirectoryUser { get; set; }

        /// <summary>
        /// The week ending date.
        /// </summary>
        public System.DateTime WeekEndingDate { get; set; }

        /// <summary>
        /// The manager approval date.
        /// </summary>
        public Nullable<System.DateTime> RepliconManagerApproverDate { get; set; }

        /// <summary>
        /// The id of the finance approver.
        /// </summary>
        public Nullable<int> RepliconFinanceApproverId { get; set; }

        /// <summary>
        /// The finance approval date.  
        /// </summary>
        public Nullable<System.DateTime> RepliconFinanceApproverDate { get; set; }
        
        /// <summary>
        /// The id of the current status of the submission.
        /// </summary>
        public int StatusId { get; set; }
        
        /// <summary>
        /// The date the submission was created.
        /// </summary>
        public System.DateTime DateCreated { get; set; }
        
        /// <summary>
        /// The date of the last time the submission was updated.  
        /// </summary>
        public System.DateTime DateUpdated { get; set; }
       
        /// <summary>
        /// A flag that states if the submission has been deleted.
        /// </summary>
        public Boolean IsDeleted { get; set; }

        /// <summary>
        /// A list of line items on the submission.
        /// </summary>
        public virtual ICollection<LineItem> LineItems { get; set; }
        
        /// <summary>
        /// A list of comments on the submission.
        /// </summary>
        public virtual ICollection<Comment> Comments { get; set; }

        /// <summary>
        /// The manager name on the submission.
        /// </summary>
        public string ManagerName { get; set; }

        /// <summary>
        /// The status on the submission.
        /// </summary>
        public virtual Status Status { get; set; }

        /// <summary>
        /// The replicon project.
        /// </summary>
        [NotMapped]
        public RepliconUserProject RepliconProject { get; set; }

        /// <summary>
        /// The total amount of the submission.
        /// </summary>
        [NotMapped]
        public decimal TotalAmount { get; set; }
    }
}