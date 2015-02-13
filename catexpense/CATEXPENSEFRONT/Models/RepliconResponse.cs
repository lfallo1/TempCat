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
    public static class RepliconResponse
    {
        /// <summary>
        /// Creates all the replicon projects in the cat expense db.
        /// </summary>
        /// <param name="projects"></param>
        /// <returns></returns>
        public static List<RepliconUserProject> CreateAllProjectsList(JArray projects)
        {
            List<RepliconUserProject> clientList = new List<RepliconUserProject>();

            foreach (object projectObject in projects)
            {
                JObject project = (JObject)projectObject;
                JObject projectProperties = (JObject)project["Properties"];

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
                        
                        foreach (JObject member in team)
                        {
                            JObject memberProperties = (JObject)member["Properties"];

                            RepliconUserProject user = new RepliconUserProject(
                                (string)memberProperties["LoginName"], projectId);
                            user.ManagerName = managerName;
                            user.ProjectName = projectName;
                            clientList.Add(user);
                        }
                       
                    }
                    catch (Exception e)
                    {
                        LOGGER.GetLogger("StackTrace").LogError(string.Format("An error occured: '{0}'", e));
                        throw;
                    }
                  
                }
            }
            return clientList;
        }


       
        /// <summary>
        /// Gets the values from the response.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static JArray GetResponseValue(JObject response)
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