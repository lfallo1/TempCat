using System;
using System.Collections.Generic;
using System.Linq;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces.Base;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using UnitTestProject.BackEnd_UnitTests.ServiceTests.Base;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    public class RepliconUserProjectServiceTests : IServiceTestBase<RepliconUserProject>
    {
        public override IService<RepliconUserProject> GetInstanceWithEmptyConstructor()
        {
            return new RepliconUserProjectService();
        }
        public override IService<RepliconUserProject> GetIServiceInstanceWithRepoParamater()
        {
            return new RepliconUserProjectService(mockRepository.Object);
        }

        public override Mock<IRepository<RepliconUserProject>> GetMockRepository()
        {
            return new Mock<IRepository<RepliconUserProject>>();
        }

        public override RepliconUserProject GetObjectInstance()
        {
            return new RepliconUserProject();
        }

        public override IQueryable<RepliconUserProject> GetObjectList()
        {
            return new List<RepliconUserProject>().AsQueryable();
        }
    }
}
