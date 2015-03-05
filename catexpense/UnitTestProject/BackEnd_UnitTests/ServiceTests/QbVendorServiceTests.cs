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
    public class QbVendorServiceTests : IServiceTestBase<QbVendor>
    {
        public override IService<QbVendor> GetIServiceInstanceWithRepoParamater()
        {
            return new QbVendorService(mockRepository.Object);
        }

        public override IService<QbVendor> GetInstanceWithEmptyConstructor()
        {
            return new QbVendorService();
        }

        public override Mock<IRepository<QbVendor>> GetMockRepository()
        {
            return new Mock<IRepository<QbVendor>>();
        }

        public override QbVendor GetObjectInstance()
        {
            return new QbVendor();
        }

        public override IQueryable<QbVendor> GetObjectList()
        {
            return new List<QbVendor>().AsQueryable();
        }
    }
}
