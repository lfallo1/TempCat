using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }
        public string ManagerName { get; set; }
        public string Name { get; set; }

        public Client()
        {

        }

        public Client(int clientId, string managerName, string name)
        {
            this.ClientId = clientId;
            this.ManagerName = managerName;
            this.Name = name;
        }
    }
}