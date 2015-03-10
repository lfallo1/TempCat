using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// The model to represent Quickbooks customers
    /// </summary>
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
        /// <summary>
        /// The id Quickbooks associates with the customer
        /// </summary>
        public int ClientId { get; set; }
        /// <summary>
        /// The name of the client
        /// </summary>
        public string ClientName { get; set; }
    }
}