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
    public class ExpenseCategoryServiceTests : IServiceTestBase<ExpenseCategory>
    {
        public override IService<ExpenseCategory> GetInstanceWithEmptyConstructor()
        {
            return new ExpenseCategoryService();
        }
        public override IService<ExpenseCategory> GetIServiceInstanceWithRepoParamater()
        {
            return new ExpenseCategoryService(mockRepository.Object);
        }

        public override Mock<IRepository<ExpenseCategory>> GetMockRepository()
        {
            return new Mock<IRepository<ExpenseCategory>>();
        }

        public override ExpenseCategory GetObjectInstance()
        {
            return new ExpenseCategory();
        }

        public override IQueryable<ExpenseCategory> GetObjectList()
        {
            return new List<ExpenseCategory>().AsQueryable();
        }
    }
}
