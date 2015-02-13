using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Class used to crud finannce approver.
    /// </summary>
    [JsonObject(IsReference = false)]
    public class FinanceApprover
    {
        /// <summary>
        /// The id of the finance approver.
        /// </summary>
        [Key]
        public int id { get; set; }
        
        /// <summary>
        /// The ad username of the finance approver
        /// </summary>
        public string userName { get; set; }

       
    }
}