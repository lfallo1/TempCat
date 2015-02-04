using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using CatExpenseFront.Controllers.Base;

namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Used to return expense categories
    /// </summary>
    public class ExpenseCategoryController : BaseController
    {

        private IExpenseCategoryService service;


        /// <summary>
        /// Default Constructor
        /// </summary>
        public ExpenseCategoryController()
        {
            service = new ExpenseCategoryService();
        }


        /// <summary>
        /// Constructor that accepts Category service
        /// </summary>
        /// <param name="iService"></param>
        public ExpenseCategoryController(IExpenseCategoryService iService)
        {
            if (service == null)
            {
                service = iService;
            }
        }
        
        /// <summary>
        /// Returns all expense categories
        /// GET api/ExpenseCategory
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ExpenseCategory> GetExpenseCategories()
        {
            return service.All();
        }

  
        /// <summary>
        /// Returns an expense category by category id.
        /// GET api/ExpenseCategory?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ExpenseCategory GetExpenseCategory(int id)
        {
            ExpenseCategory expenseCategory = service.All().FirstOrDefault(c => c.ExpenseCategoryId == id);
            if (expenseCategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return expenseCategory;
        }


    }
}
