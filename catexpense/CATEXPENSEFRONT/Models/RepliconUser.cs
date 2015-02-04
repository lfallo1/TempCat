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
    public class RepliconUser
    {
        public RepliconUser()
        {

        }

        public RepliconUser(int userId, string username, bool financeApprover)
        {
            this.RepliconUserId = userId;
            this.RepliconUserName = username;
            this.FinanceApprover = financeApprover;
        }


        public int RepliconUserId { get; set; }
        public string RepliconUserName { get; set; }
        public bool FinanceApprover { get; set; }

    }
}