using System;
using System.Configuration;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;

namespace Selenium
{
    public class SeleniumDriver
    {

        private static IWebDriver driver;

        public static IWebDriver WebDriver
        {
            get
            {
                if (driver == null)
                {
                    string browser;
                    using (var sr = new StreamReader(@"../../../Selenium/App.config"))
                    {
                        browser = sr.ReadLine();
                    }
                    if (!string.IsNullOrEmpty(browser))
                    {
                        switch (browser)
                        {
                            case "Chrome":
                                driver = new ChromeDriver(@"../../../Selenium/SeleniumDrivers");
                                ConfigureDriver();
                                break;
                            case "Firefox":
                                driver = new FirefoxDriver();
                                ConfigureDriver();
                                break;
                            case "IE":
                                driver = new InternetExplorerDriver(@"../../../Selenium/SeleniumDrivers");
                                ConfigureDriver();
                                break;
                            default:
                                Console.WriteLine("App.config key error.");
                                Console.WriteLine("Defaulting to Chrome");
                                driver = new ChromeDriver(@"../../../Selenium/SeleniumDrivers");
                                ConfigureDriver();
                                break;
                        }
                    }
                    else
                    {
                        Console.WriteLine("* * * * DEFAULTMODE * * * *");
                        Console.WriteLine("App.config key not present.");
                        driver = new ChromeDriver(@"../../../Selenium/SeleniumDrivers");
                        ConfigureDriver();
                    }
                }
                return driver;
            }
            protected set
            {
                driver = value;
            }
        }
        internal static void ConfigureDriver()
        {
            SetTimeout();
            driver.Manage().Cookies.DeleteAllCookies();
            driver.Manage().Window.Maximize();
        }

        private static void SetTimeout()
        {
            string strtimeout = ConfigurationManager.AppSettings["defaultTimeout"];
            int timeout;
            if (int.TryParse(strtimeout, out timeout))
            {
                if (timeout != 0)
                {
                    driver.Manage().Timeouts().ImplicitlyWait(new TimeSpan(0, 0, timeout));
                }
            }
            else
            {
                driver.Manage().Timeouts().ImplicitlyWait(new TimeSpan(0, 0, 15));
            }
        }
    }
}
