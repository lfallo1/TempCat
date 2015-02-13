using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Model used to hold expense categories.
    /// </summary>
    [JsonObject(IsReference = false)]
    public class ExpenseCategory
    {
       /// <summary>
       /// Default Construtor
       /// </summary>
        public ExpenseCategory()
        {

        }

        /// <summary>
        /// The Id of the category.
        /// </summary>
        public int ExpenseCategoryId { get; set; }
        
        /// <summary>
        /// The name of the category.
        /// </summary>
        public string ExpenseCategoryName { get; set; }

    }
}