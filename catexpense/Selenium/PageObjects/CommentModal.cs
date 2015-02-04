using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class CommentModal : ConfirmModal
    {
        private static readonly By commentTextArea = By.Id("commentTextArea");

        public CommentModal(IWebDriver driver)
            : base(driver)
        {
        }

        public CommentModal TypeComment(string comment)
        {
            Find(commentTextArea).SendKeys(comment);
            return this;
        }
    }
}
