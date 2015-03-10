using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// A model representing the Vendors in Quickbooks (employees of catalyst)
    /// </summary>
    public class QbVendor
    {
        public QbVendor()
        {
        }
        public QbVendor(int id, string name)
        {
            VendorId = id;
            VendorName = name;
        }
        [Key]
        public int Id { get; private set; }
        /// <summary>
        /// This is the id Quickbooks associates with a vendor
        /// </summary>
        public int VendorId { get; set; }
        /// <summary>
        /// The display name of a vendor in Quickbooks
        /// </summary>
        public string VendorName { get; set; }
    }
}