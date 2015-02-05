using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    public class UserWithSession
    {
        public string userName { get; set; }
        public bool isLoggedIn { get; set; }
        public bool isFinanceApprover { get; set; }
        public bool isManager { get; set; }
    }
}