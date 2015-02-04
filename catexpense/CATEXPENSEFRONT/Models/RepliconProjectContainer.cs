using System;
using System.Collections.Generic;

namespace CatExpenseFront.Models
{
    public class RepliconProjectContainer
    {

        public RepliconProjectContainer(int projectId, string managerName, string projectName, int managerId, List<RepliconUserProject> teamMembers)
        {
            this.RepliconProjectId = projectId;
            this.RepliconManagerName = managerName;
            this.RepliconProjectName = projectName;
            this.ManagerId = managerId;
            this.TeamMembers = teamMembers;
        }

        public RepliconProjectContainer(RepliconUserProject project) {

            this.RepliconProjectId = project.ProjectId;
            this.RepliconManagerName = project.ManagerName;
            this.RepliconProjectName = project.ProjectName;
        }


        public int RepliconProjectId { get; set; }
        public string RepliconProjectName { get; set; }
        public string RepliconManagerName { get; set; }
        public int ManagerId { get; set; }
        public List<RepliconUserProject> TeamMembers { get; set; }      
    }
}