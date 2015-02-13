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
    /// Model used to hold statuses.
    /// </summary>
    [JsonObject(IsReference = false)]
    public class Status
    {
        /// <summary>
        /// Default Constructor.
        /// </summary>
        public Status()
        {

        }

        /// <summary>
        /// The Id of the status.
        /// </summary>
        public int StatusId { get; set; }
        
        /// <summary>
        /// The name of the status.
        /// </summary>
        public string StatusName { get; set; }

    }
}