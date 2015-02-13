using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CatExpenseFront.ViewModels
{
    /// <summary>
    /// returns a receipts object that just has name and id.
    /// </summary>
    public class ReceiptWithoutImage
    {
        /// <summary>
        /// The id of the reciept.
        /// </summary>
        public int ReceiptId { get; set; }
        
        /// <summary>
        /// The name of the reciept.
        /// </summary>
        public string FileName { get; set; }
     
    }
}