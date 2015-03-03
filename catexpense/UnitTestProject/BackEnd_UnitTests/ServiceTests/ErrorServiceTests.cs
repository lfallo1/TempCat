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
    public class ErrorServiceTests : IServiceTestBase<Error>
    {
        public override IService<Error> GetInstanceWithEmptyConstructor()
        {
            return new ErrorService();
        }
        public override IService<Error> GetIServiceInstanceWithRepoParamater()
        {
            return new ErrorService(mockRepository.Object);
        }

        public override Mock<IRepository<Error>> GetMockRepository()
        {
            return new Mock<IRepository<Error>>();
        }

        public override Error GetObjectInstance()
        {
            return new Error();
        }

        public override IQueryable<Error> GetObjectList()
        {
            return new List<Error>().AsQueryable();
        }
    }
}
