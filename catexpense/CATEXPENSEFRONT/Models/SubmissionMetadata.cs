using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Web;

namespace CatExpenseFront.Models
{
    public static class SubmissionMetadata
    {
        // Metadata
        [NotMapped]
        public static double Miles { get; set; }
        [NotMapped]
        public static string Origin { get; set; }
        [NotMapped]
        public static string Destination { get; set; }

        [NotMapped]
        public static string Sunday { get; set; }
        [NotMapped]
        public static string Monday { get; set; }
        [NotMapped]
        public static string Tuesday { get; set; }
        [NotMapped]
        public static string Wednesday { get; set; }
        [NotMapped]
        public static string Thursday { get; set; }
        [NotMapped]
        public static string Friday { get; set; }
        [NotMapped]
        public static string Saturday { get; set; }

        
        public static string MakeString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("Miles:" + Miles.ToString());
            sb.Append(",Origin:" + Origin);
            sb.Append(",Destination:" + Destination);
            sb.Append(",Sunday:" + Sunday);
            sb.Append(",Monday:" + Monday);
            sb.Append(",Tuesday:" + Tuesday);
            sb.Append(",Wednesday:" + Wednesday);
            sb.Append(",Thursday:" + Thursday);
            sb.Append(",Friday:" + Friday);
            sb.Append(",Saturday:" + Saturday);
            return sb.ToString();
        }

        public static void SetMetadata(string value)
        {
            string[] metadataString = value.Split(',');
            foreach (string m in metadataString)
            {
                string[] dataString = m.Split(':');
                switch (dataString[0])
                {
                    case "Miles":
                        Miles = Convert.ToDouble(dataString[1]);
                        break;
                    case "Origin":
                        Origin = dataString[1];
                        break;
                    case "Destination":
                        Destination = dataString[1];
                        break;
                    case "Sunday":
                        Sunday = dataString[1];
                        break;
                    case "Monday":
                        Monday = dataString[1];
                        break;
                    case "Tuesday":
                        Tuesday = dataString[1];
                        break;
                    case "Wednesday":
                        Wednesday = dataString[1];
                        break;
                    case "Thursday":
                        Thursday = dataString[1];
                        break;
                    case "Friday":
                        Friday = dataString[1];
                        break;
                    case "Saturday":
                        Saturday = dataString[1];
                        break;
                    default:
                        break;
                }
            }
        }
    }
}