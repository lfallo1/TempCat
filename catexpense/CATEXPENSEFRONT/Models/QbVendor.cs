using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
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
        public int VendorId { get; set; }
        public string VendorName { get; set; }
    }
}