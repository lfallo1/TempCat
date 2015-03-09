using System.Web.Mvc;
using CatExpenseFront.Controllers.Base;

namespace CatExpenseFront.Controllers
{

    /// <summary>
    /// Only used to load the index page.
    /// </summary>
    public class HomeController : Controller
    {
        // GET: /Home/

        public ActionResult Index()
        {
            return View("index");
        }

    }
}
