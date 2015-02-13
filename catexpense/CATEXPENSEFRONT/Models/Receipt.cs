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
        /// <summary>
        /// The id of the reciept.
        /// </summary>
        public int ReceiptId { get; set; }
        
        /// <summary>
        /// The id of the line item that the reciept is attached.
        /// </summary>
        public int LineItemId { get; set; }
        
        /// <summary>
        /// The byte array of the image file.
        /// </summary>
        public byte[] ReceiptImage { get; set; }
        
        /// <summary>
        /// Front end storage of the image file.
        /// </summary>
        [NotMapped]
        public string Base64String { get; set; } 
        
        /// <summary>
        /// The date that the image was created.
        /// </summary>
        public DateTime DateCreated { get; set; }
        
        /// <summary>
        /// The name of the file.
        /// </summary>
        public string Name { get; set; }
        
        /// <summary>
        /// The type of image format.
        /// </summary>
        public string Type { get; set; }
    }
}