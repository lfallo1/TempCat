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
    public class Comment
    {
        /// <summary>
        /// The unique Id of the comment.
        /// </summary>
        public int CommentId { get; set; }
        
        /// <summary>
        /// The id of the submission that the comment is tied to.
        /// </summary>
        public int SubmissionId { get; set; }

        /// <summary>
        /// The comment text.
        /// </summary>
        public string ExpenseComment { get; set; }
        
        /// <summary>
        /// The date that the comment was added.
        /// </summary>
        public System.DateTime DateCreated { get; set; }

        /// <summary>
        /// The date the comment was updated.
        /// </summary>
        public System.DateTime DateUpdated { get; set; }

        /// <summary>
        /// The user name of the user that posted the comment.
        /// </summary>
        public virtual string RepliconUserName { get; set; }

        /// <summary>
        /// The status Id of the comment
        /// </summary>
        public int StatusId { get; set; }


        /// <summary>
        /// The status on the submission.
        /// </summary>
        public virtual Status Status { get; set; }
    }
}