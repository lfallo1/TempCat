using OpenQA.Selenium;
namespace Selenium.PageObjects
{
    public class ExpenseReportEmployeePage : PageObjectBase
    {
        private IWebDriver driver;

        public ExpenseReportEmployeePage(IWebDriver driver)
            : base(driver)
        {
            this.driver = driver;
        }
    }
}
