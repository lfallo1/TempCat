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
    public class RepliconProject
    {
        public RepliconProject()
        {

        }

        public RepliconProject(RepliconProjectContainer project)
        {
            this.RepliconProjectId = project.RepliconProjectId;
            this.RepliconManagerName = project.RepliconManagerName;
            this.RepliconProjectName = project.RepliconProjectName;
        }

        public RepliconProject(RepliconUserProject project)
        {
            this.RepliconProjectId = project.ID;
            this.RepliconManagerName = project.ManagerName;
            this.RepliconProjectName = project.ProjectName;
        }

        public RepliconProject(int projectId, string managerName, string projectName)
        {
            this.RepliconProjectId = projectId;
            this.RepliconManagerName = managerName;
            this.RepliconProjectName = projectName;
        }


        public int id { get; set; }
        public int RepliconProjectId { get; set; }
        public string RepliconProjectName { get; set; }
        public string RepliconManagerName { get; set; }

    }
}