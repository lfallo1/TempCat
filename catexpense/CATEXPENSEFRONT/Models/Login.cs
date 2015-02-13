using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// The item used to login
    /// </summary>
    public class Login
    {
        /// <summary>
        /// The username used to login.
        /// </summary>
        public string Username { get; set; }
        
        /// <summary>
        /// The password used to login.
        /// </summary>
        public string Password { get; set; }
        
        /// <summary>
        /// The full name returned fromm active directory.
        /// </summary>
        public string FullName { get; set; }
        
        /// <summary>
        /// The email of the user from active directory.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The manager from active directory.
        /// </summary>
        public Login Manager { get; set; }
        
        /// <summary>
        /// Is a finace approver.
        /// </summary>
        public bool isFinanceApprover { get; set; }
        
        /// <summary>
        /// Is a manager of any project.
        /// </summary>
        public bool isManager { get; set; }
    }
}