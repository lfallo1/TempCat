using Selenium.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace Selenium.Page_Methods
{
    public class HomePageMethods
    {
        HomePage _homePage;

        public HomePageMethods(HomePage homePage)
        {
            _homePage = homePage;
        }
         
        public bool ClickSync()
        {
            var isClicked = false;
            try
            {
                _homePage.ClickSync();
                isClicked = true;
            }
            catch(ElementNotVisibleException e)
            {
                isClicked = false;
                string error = e.ToString();
                Logger.Logger.GetLogger("TestDetails").LogError(error);
            }

            return isClicked;
            
        }

        public bool ClickCreateNewExpense()
        {
            var isClicked = false;
            try
            {
                _homePage.ClickCreateNewExpenseReport();
                isClicked = true;
            }
            catch (ElementNotVisibleException e)
            {
                isClicked = false;
                string error = e.ToString();
                Logger.Logger.GetLogger("TestDetails").LogError(error);
            }

            return isClicked;
        }
    }
}
