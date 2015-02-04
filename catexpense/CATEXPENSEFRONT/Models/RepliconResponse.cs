using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Linq;
using LOGGER = Logger.Logger;

namespace CatExpenseFront.Models
{
    public static class RepliconResponse
    {
        private const string DEFAULTMANAGER = "dyoung";


        public static List<RepliconUser> CreateAllUsersList(JArray users)
        {
            List<RepliconUser> userList = new List<RepliconUser>();

            foreach (object userObject in users)
            {
                JObject user = (JObject)userObject;
                JObject userProperties = (JObject)user["Properties"];

                int userId = (int)userProperties["Id"];
                string username = (string)userProperties["LoginName"];

                bool financeApprover = false;

                RepliconUser newUser = new RepliconUser(userId, username, financeApprover);
                userList.Add(newUser);
            }
            return userList;
        }

        public static List<RepliconProject> CreateAllProjectsListEntity(JArray projects)
        {
            List<RepliconProject> clientList = new List<RepliconProject>();

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
                    try
                    {
                        JObject projectManager = (JObject)projectRelationships["ProjectLeader"];
                        JObject managerProperties = (JObject)projectManager["Properties"];
                        managerName = (string)managerProperties["LoginName"];
                        managerId = (int)managerProperties["Id"];
                    }
                    catch (Exception e)
                    {
                        managerName = DEFAULTMANAGER;
                        LOGGER.GetLogger("StackTrace").LogError(string.Format("An error occured: '{0}'", e));
                        throw;
                    }
                    RepliconProject client = new RepliconProject(projectId, managerName, projectName);
                    clientList.Add(client);
                }
            }
            return clientList;
        }

        public static List<RepliconProjectContainer> CreateAllProjectsList(JArray projects)
        {
            List<RepliconProjectContainer> clientList = new List<RepliconProjectContainer>();

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
                            teamMembers.Add(user);
                        }
                       
                    }
                    catch (Exception e)
                    {
                        managerName = DEFAULTMANAGER;
                        LOGGER.GetLogger("StackTrace").LogError(string.Format("An error occured: '{0}'", e));
                        throw;
                    }
                    RepliconProjectContainer client = new RepliconProjectContainer(projectId, managerName, projectName, managerId, teamMembers);
                    clientList.Add(client);
                }
            }
            return clientList;
        }


        //THIS CAN GO AWAY WHEN WE HAVE COMPLETELY SWITCHED TO THE EXPENSE 12 DATABASE/CODE
        public static List<Client> CreateAllProjectsClientList(JArray projects)
        {
            List<Client> clientList = new List<Client>();

            foreach (object projectObject in projects)
            {
                JObject project = (JObject)projectObject;
                JObject projectProperties = (JObject)project["Properties"];

                bool closedStatus = (bool)projectProperties["ClosedStatus"];
                if (closedStatus)
                {
                    continue;
                }
                int projectId = (int)projectProperties["Id"];
                string projectName = (string)projectProperties["Name"];

                JObject projectRelationships = (JObject)project["Relationships"];
                string managerName = string.Empty;
                try
                {
                    JObject projectManager = (JObject)projectRelationships["ProjectLeader"];
                    JObject managerProperties = (JObject)projectManager["Properties"];
                    managerName = (string)managerProperties["LoginName"];
                }
                catch (Exception e)
                {
                    managerName = DEFAULTMANAGER;
                    LOGGER.GetLogger("StackTrace").LogError(string.Format("An error occured: '{0}'", e));
                    throw;
                }
                Client client = new Client(projectId, managerName, projectName);
                clientList.Add(client);
            }
            return clientList;
        }

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