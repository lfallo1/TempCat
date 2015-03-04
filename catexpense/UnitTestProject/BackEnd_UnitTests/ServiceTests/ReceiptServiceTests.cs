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
    public class ReceiptServiceTests : IServiceTestBase<Receipt>
    {
        public override IService<Receipt> GetInstanceWithEmptyConstructor()
        {
            return new ReceiptService();
        }
        public override IService<Receipt> GetIServiceInstanceWithRepoParamater()
        {
            return new ReceiptService(mockRepository.Object);
        }

        public override Mock<IRepository<Receipt>> GetMockRepository()
        {
            return new Mock<IRepository<Receipt>>();
        }

        public override Receipt GetObjectInstance()
        {
            return new Receipt();
        }

        public override IQueryable<Receipt> GetObjectList()
        {
            return new List<Receipt>().AsQueryable();
        }
    }
}
