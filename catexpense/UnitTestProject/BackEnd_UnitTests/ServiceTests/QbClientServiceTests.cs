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
    public class QbClientServiceTests : IServiceTestBase<QbClient>
    {
        public override IService<QbClient> GetIServiceInstanceWithRepoParamater()
        {
            return new QbClientService(mockRepository.Object);
        }

        public override IService<QbClient> GetInstanceWithEmptyConstructor()
        {
            return new QbClientService();
        }

        public override Mock<IRepository<QbClient>> GetMockRepository()
        {
            return new Mock<IRepository<QbClient>>();
        }

        public override QbClient GetObjectInstance()
        {
            return new QbClient();
        }

        public override IQueryable<QbClient> GetObjectList()
        {
            return new List<QbClient>().AsQueryable();
        }
    }
}
