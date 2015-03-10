using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces.Base;
using Moq;
using NUnit.Framework;
using UnitTestProject.BackEnd_UnitTests.ServiceTests.Base;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    public class QbAccountServiceTests : IServiceTestBase<QbAccount>
    {
        public override IService<QbAccount> GetIServiceInstanceWithRepoParamater()
        {
            return new QbAccountService(mockRepository.Object);
        }

        public override IService<QbAccount> GetInstanceWithEmptyConstructor()
        {
            return new QbAccountService();
        }

        public override Mock<IRepository<QbAccount>> GetMockRepository()
        {
            return new Mock<IRepository<QbAccount>>();
        }

        public override QbAccount GetObjectInstance()
        {
            return new QbAccount();
        }

        public override IQueryable<QbAccount> GetObjectList()
        {
            return new List<QbAccount>().AsQueryable();
        }
    }
}
