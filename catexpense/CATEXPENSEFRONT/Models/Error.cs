using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    [JsonObject(IsReference = false)]
    public class Error
    {

        public Error() { }

        public int ErrorId { get; set; }
        public string UserName { get; set; }
        public string EndPoint { get; set; }
        public string ErrorMessage { get; set; }
        public System.DateTime DateCreated { get; set; }
    }
}