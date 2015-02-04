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
    public class LineItemComment
    {
        public int LineItemCommentId { get; set; }
        public int SubmissionId { get; set; }
        public string ExpenseComment { get; set; }
        public System.DateTime DateCreated { get; set; }
        public System.DateTime DateUpdated { get; set; }

        public virtual string RepliconUserName { get; set; }
    }
}