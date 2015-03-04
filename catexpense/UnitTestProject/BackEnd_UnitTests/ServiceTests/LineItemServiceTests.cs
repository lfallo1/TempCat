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
    public class LineItemServiceTests : IServiceTestBase<LineItem>
    {
        public override IService<LineItem> GetInstanceWithEmptyConstructor()
        {
            return new LineItemService();
        }
        public override IService<LineItem> GetIServiceInstanceWithRepoParamater()
        {
            return new LineItemService(mockRepository.Object);
        }

        public override Mock<IRepository<LineItem>> GetMockRepository()
        {
            return new Mock<IRepository<LineItem>>();
        }

        public override LineItem GetObjectInstance()
        {
            return new LineItem();
        }

        public override IQueryable<LineItem> GetObjectList()
        {
            return new List<LineItem>().AsQueryable();
        }
    }
}
