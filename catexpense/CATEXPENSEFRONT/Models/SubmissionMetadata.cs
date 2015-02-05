using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Web;

namespace CatExpenseFront.Models
{
    public class SubmissionMetadata
    {
        // Metadata
        [NotMapped]
        public double Miles { get; set; }
        [NotMapped]
        public string Origin { get; set; }
        [NotMapped]
        public string Destination { get; set; }

        [NotMapped]
        public string Sunday { get; set; }
        [NotMapped]
        public string Monday { get; set; }
        [NotMapped]
        public string Tuesday { get; set; }
        [NotMapped]
        public string Wednesday { get; set; }
        [NotMapped]
        public string Thursday { get; set; }
        [NotMapped]
        public string Friday { get; set; }
        [NotMapped]
        public string Saturday { get; set; }


        public string MakeString()
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

        public void SetMetadata(string value)
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