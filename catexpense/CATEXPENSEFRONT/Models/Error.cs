﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    [JsonObject(IsReference = false)]
    public class Error
    {
        public Error() { }

        public string username { get; set; }
        public string endpoint { get; set; }
        public string message { get; set; }
        public System.DateTime DateCreated { get; set; }
    }
}