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
    public class ExpenseCategory
    {
        public ExpenseCategory()
        {

        }

        public int ExpenseCategoryId { get; set; }
        public string ExpenseCategoryName { get; set; }

    }
}