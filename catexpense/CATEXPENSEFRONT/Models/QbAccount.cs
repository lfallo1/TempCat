using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
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
        public int AccountId { get; set; }
        public string AccountName { get; set; }
    }
}