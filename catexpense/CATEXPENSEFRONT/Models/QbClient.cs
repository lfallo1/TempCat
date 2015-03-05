using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    public class QbClient
    {

        public QbClient() { }
        public QbClient(int id, string name)
        {
            ClientId = id;
            ClientName = name;
        }

        [Key]
        public int Id { get; private set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
    }
}