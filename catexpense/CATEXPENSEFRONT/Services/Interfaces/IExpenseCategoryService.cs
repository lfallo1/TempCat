using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces.Base;

namespace CatExpenseFront.Services.Interfaces
{
    /// <summary>
    /// Interface used to Crud Expense Categories
    /// </summary>
    public interface IExpenseCategoryService : IService<ExpenseCategory>
    {
    }
}