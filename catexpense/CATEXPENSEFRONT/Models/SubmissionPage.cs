using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    public class SubmissionPage
    {
        [Key]
        public int SubmissionId { get; set; }
        public Nullable<decimal> AcceptedTotal { get; set; }
        public string Username { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string FullStatus { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Status1 { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Status2 { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public int WeekOfExpenses { get; set; }
        public Nullable<System.DateTime> DateOfSubmission { get; set; }
        public bool IsSubmitted { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ClientName { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string IsApproved { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ManagerName { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
    }
}