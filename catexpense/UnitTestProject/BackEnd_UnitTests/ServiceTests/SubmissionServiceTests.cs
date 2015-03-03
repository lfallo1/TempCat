using System;
using System.Collections.Generic;
using System.Linq;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services.Interfaces.Base;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using UnitTestProject.BackEnd_UnitTests.ServiceTests.Base;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    public class SubmissionServiceTests : IServiceTestBase<Submission>
    {
        public override IService<Submission> GetInstanceWithEmptyConstructor()
        {
            return new SubmissionService();
        }
        public override IService<Submission> GetIServiceInstanceWithRepoParamater()
        {
            return new SubmissionService(mockRepository.Object);
        }

        public override Mock<IRepository<Submission>> GetMockRepository()
        {
            return new Mock<IRepository<Submission>>();
        }

        public override Submission GetObjectInstance()
        {
            return new Submission();
        }

        public override IQueryable<Submission> GetObjectList()
        {
            return new List<Submission>().AsQueryable();
        }
    }
}
