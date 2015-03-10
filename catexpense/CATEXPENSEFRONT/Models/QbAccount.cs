using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// The model reflecting the QbAccounts table in the DB.
    /// </summary>
    public class QbAccount
    {
        public QbAccount()
        {
        }
        public QbAccount(int id, string name)
        {
            AccountId = id;
            AccountName = name;
        }
        [Key]
        public int Id { get; private set; }
        /// <summary>
        /// The number that Quickbooks associates with this account
        /// </summary>
        public int AccountId { get; set; }
        /// <summary>
        /// The name on the account
        /// </summary>
        public string AccountName { get; set; }
    }
}