using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    [JsonObject(IsReference = false)]
    public class Receipt
    {
        public int ReceiptId { get; set; }
        public int LineItemId { get; set; }
        public byte[] ReceiptImage { get; set; }
        [NotMapped]
        public string Base64String { get; set; } 
        public DateTime DateCreated { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}