using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    [JsonObject(IsReference = false)]
    public class FinanceApprover
    {
        [Key]
        public int id { get; set; }
        public string Username { get; set; }

       
    }
}