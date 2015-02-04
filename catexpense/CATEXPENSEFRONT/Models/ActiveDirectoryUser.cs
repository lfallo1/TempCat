using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    [JsonObject(IsReference = false)]
    public class ActiveDirectoryUser
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public ActiveDirectoryUser Manager { get; set; }
    }
}