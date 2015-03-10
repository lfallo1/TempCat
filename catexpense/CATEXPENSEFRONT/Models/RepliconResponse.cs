using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Linq;
using LOGGER = Logger.Logger;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// The response from the replicon call.
    /// </summary>
    public class RepliconResponse
    {
        /// <summary>
        /// Creates all the replicon projects in the cat expense db.
        /// </summary>
        /// <param name="projects"></param>
        /// <returns></returns>
        public virtual List<RepliconUserProject> CreateAllProjectsList(JArray projects)
        {
            List<RepliconUserProject> clientList = new List<RepliconUserProject>();

            for (int i = 0; i < projects.Count; i++)
            {
                JObject project = (JObject)projects[i];
                JObject projectProperties = (JObject)project["Properties"];


                ifNotClosed(clientList, project, projectProperties);
            }
            return clientList;
        }

        /// <summary>
        /// Only adds projects that are not closed.
        /// </summary>
        /// <param name="clientList"></param>
        /// <param name="project"></param>
        /// <param name="projectProperties"></param>
        /// <param name="closedStatus"></param>
        private void ifNotClosed(List<RepliconUserProject> clientList, JObject project, JObject projectProperties)
        {
            bool closedStatus = (bool)projectProperties["ClosedStatus"];
            if (!closedStatus)
            {
                int projectId = (int)projectProperties["Id"];
                string projectName = (string)projectProperties["Name"];

                JObject projectRelationships = (JObject)project["Relationships"];
                string managerName = string.Empty;
                int managerId = 0;
                List<RepliconUserProject> teamMembers = new List<RepliconUserProject>();
                try
                {
                    JObject projectManager = (JObject)projectRelationships["ProjectLeader"];
                    JArray team = (JArray)projectRelationships["ProjTeamUsers"];
                    JObject managerProperties = (JObject)projectManager["Properties"];
                    managerName = (string)managerProperties["LoginName"];
                    managerId = (int)managerProperties["Id"];

                    teamLoop(clientList, projectId, projectName, managerName, team);

                }
                catch (Exception e)
                {
                    LOGGER.GetLogger("StackTrace").LogError(string.Format("An error occured: '{0}'", e));
                    throw;
                }

            }
        }

        /// <summary>
        /// Loops through to add team members for a project.
        /// </summary>
        /// <param name="clientList"></param>
        /// <param name="projectId"></param>
        /// <param name="projectName"></param>
        /// <param name="managerName"></param>
        /// <param name="team"></param>
        private void teamLoop(List<RepliconUserProject> clientList, int projectId, string projectName, string managerName, JArray team)
        {
            for (int i = 0; i < team.Count; i++)
            {
                JObject memberProperties = (JObject)team[i]["Properties"];

                RepliconUserProject user = new RepliconUserProject(
                    (string)memberProperties["LoginName"], projectId);
                user.ManagerName = managerName;
                user.ProjectName = projectName;
                clientList.Add(user);
            }
        }



        /// <summary>
        /// Gets the values from the response.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public virtual JArray GetResponseValue(JObject response)
        {
            string status = (string)response["Status"];
            if (status != "OK")
            {
                LOGGER.GetLogger("StackTrace").LogError(string.Format(
                    "Expected Status OK, but was {0} - {1}",
                    status,
                    (string)response["Message"]));
                throw new FileNotFoundException();
            }
            return (JArray)response["Value"];
        }
    }
}