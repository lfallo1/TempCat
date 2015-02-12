using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Class used to save user projects 
    /// </summary>
    [JsonObject(IsReference = false)]
    public class RepliconUserProject
    {

        /// <summary>
        /// Default Constructor
        /// </summary>
        public RepliconUserProject()
        {

        }

        /// <summary>
        /// Constructor that expects all fields
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="projectId"></param>
        public RepliconUserProject(string Username, int projectId)
        {
            this.UserName = Username;
            this.ProjectId = projectId;

        }

        /// <summary>
        /// Constructor that expects all fields
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="projectId"></param>
        public RepliconUserProject(int id, string Username, int projectId)
        {
            this.UserName = Username;
            this.ProjectId = projectId;
            this.ID = id;

        }

        /// <summary>
        /// Actrive directory login
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// The id of the project
        /// </summary>
        public int ProjectId { get; set; }

        /// <summary>
        /// The id of the project
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// The name of the manager on the project
        /// </summary>
        public string ManagerName {get;set;}


        /// <summary>
        /// The name of the project
        /// </summary>
        public string ProjectName { get; set; }


    }

}
