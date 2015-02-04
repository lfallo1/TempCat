using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Expense Class 
    /// </summary>
    public class Expense
    {
        /// <summary>
        /// Get and set methods for Expense Id
        /// </summary>
        [Key]
        public int ExpenseId { get; set; }
        /// <summary>
        /// Get and set methods for Date
        /// </summary>
        public DateTime Date { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal Amount { get; set; }
        public int SubmissionId { get; set; }
        public bool Receipt { get; set; }
        public bool Billable { get; set; }

        public string Metadata
        {
            get
            {
                return SubmissionMetadata.MakeString();
            }
            set
            {
                SubmissionMetadata.SetMetadata(value);
            }
        }
    }

    [Serializable]
    public enum Category
    {
        __invalid__ = 0,
        mileage = 1,
        per_diem = 2,
        transportation = 3,
        lodging = 4,
        parking = 5,
        entertainment = 6,
        meals = 7,
        airfare = 8,
        other = 9
    }

    /*
     Expected values:
        Id String
        1	mileage
        2	per diem
        3	transportation
        4	lodging
        5	parking
        6	entertainment
        7	meals
        8	airfaire
        9	other

    These are case sensitive.

     */
}