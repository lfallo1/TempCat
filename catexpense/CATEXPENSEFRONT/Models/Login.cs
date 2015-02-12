using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public Login Manager { get; set; }
        public bool isLoggedIn { get; set; }
        public bool isFinanceApprover { get; set; }
        public bool isManager { get; set; }
    }
}