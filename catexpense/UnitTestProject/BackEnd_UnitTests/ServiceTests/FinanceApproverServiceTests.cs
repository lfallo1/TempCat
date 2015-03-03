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
    public class FinanceApproverServiceTests : IServiceTestBase<FinanceApprover>
    {
        public override IService<FinanceApprover> GetInstanceWithEmptyConstructor()
        {
            return new FinanceApproverService();
        }
        public override IService<FinanceApprover> GetIServiceInstanceWithRepoParamater()
        {
            return new FinanceApproverService(mockRepository.Object);
        }

        public override Mock<IRepository<FinanceApprover>> GetMockRepository()
        {
            return new Mock<IRepository<FinanceApprover>>();
        }

        public override FinanceApprover GetObjectInstance()
        {
            return new FinanceApprover();
        }

        public override IQueryable<FinanceApprover> GetObjectList()
        {
            return new List<FinanceApprover>().AsQueryable();
        }
    }
}
