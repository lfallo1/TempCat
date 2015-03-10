using System;
using System.Collections.Generic;
using CatExpenseFront.Models;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class RespliconResponseTest
    {
        [Test]
        public void CreateAllProjectsListTest()
        {
            RepliconResponse response = new RepliconResponse();

            JArray projects = new JArray();
         
            JArray team = new JArray();
            JObject teamMember = new JObject();
            JObject teamProperties = new JObject();
            JObject project = new JObject();
            JObject properties = new JObject();
            JObject relationShips = new JObject();
            team.Add(teamProperties);

            teamMember["LoginName"] = "memberName";
            teamProperties["Properties"] = teamMember;
            JObject manager = new JObject();
            JObject managerProperties = new JObject();
            managerProperties["LoginName"] = "testName";
            managerProperties["Id"] = -2;
            manager["Properties"] = managerProperties;
          
        

            relationShips["ProjectLeader"] = manager;

            properties["ClosedStatus"] = false;
            properties["Id"] = -1;
            properties["Name"] = "testProjectName";
            project["Relationships"] = relationShips;

            project["Properties"] = properties;
            relationShips["ProjTeamUsers"] = team;



              projects.Insert(0, project);

           List<RepliconUserProject> projectList = response.CreateAllProjectsList(projects);
           Assert.AreEqual(projectList.Count, 1);
           Assert.AreEqual(projectList[0].ID, 0);
           Assert.AreEqual(projectList[0].ManagerName,"testName");
           Assert.AreEqual(projectList[0].ProjectId, -1);
           Assert.AreEqual(projectList[0].ProjectName, "testProjectName");
           Assert.AreEqual(projectList[0].UserName, "memberName");

        }

        [Test]
        public void CreateAllProjectsListClosedProjectTest()
        {
            RepliconResponse response = new RepliconResponse();

            JArray projects = new JArray();

            JArray team = new JArray();
            JObject teamMember = new JObject();
            JObject teamProperties = new JObject();
            JObject project = new JObject();
            JObject properties = new JObject();
            JObject relationShips = new JObject();
            team.Add(teamProperties);

            teamMember["LoginName"] = "memberName";
            teamProperties["Properties"] = teamMember;
            JObject manager = new JObject();
            JObject managerProperties = new JObject();
            managerProperties["LoginName"] = "testName";
            managerProperties["Id"] = -2;
            manager["Properties"] = managerProperties;



            relationShips["ProjectLeader"] = manager;

            properties["ClosedStatus"] = true;
            properties["Id"] = -1;
            properties["Name"] = "testProjectName";
            project["Relationships"] = relationShips;

            project["Properties"] = properties;
            relationShips["ProjTeamUsers"] = team;



            projects.Insert(0, project);

            List<RepliconUserProject> projectList = response.CreateAllProjectsList(projects);
            Assert.AreEqual(projectList.Count, 0);

        }

        [Test]
        public void CreateAllProjectsListMissingFieldTest()
        {
            RepliconResponse response = new RepliconResponse();

            JArray projects = new JArray();

            JArray team = new JArray();
            JObject teamMember = new JObject();
            JObject teamProperties = new JObject();
            JObject project = new JObject();
            JObject properties = new JObject();
            JObject relationShips = new JObject();
            team.Add(teamProperties);

            teamMember["LoginName"] = "memberName";
            teamProperties["Properties"] = teamMember;
            JObject manager = new JObject();
            // JObject managerProperties = new JObject();
            // managerProperties["LoginName"] = "testName";
            // managerProperties["Id"] = -2;
            // manager["Properties"] = managerProperties;



            relationShips["ProjectLeader"] = manager;

            properties["ClosedStatus"] = false;
            properties["Id"] = -1;
            properties["Name"] = "testProjectName";
            project["Relationships"] = relationShips;

            project["Properties"] = properties;
            relationShips["ProjTeamUsers"] = team;



            projects.Insert(0, project);
            try
            {
                response.CreateAllProjectsList(projects);
            }catch(Exception ex){
                Assert.AreEqual("Object reference not set to an instance of an object.", ex.Message);
            }
           

        }

    }
}
