using System.Web.Mvc;
using CatExpenseFront.Controllers.Base;

namespace CatExpenseFront.Controllers
{

    /// <summary>
    /// Only used to load the index page.
    /// </summary>
    public class HotTowelController : Controller
    {
        // GET: /HotTowel/

        public ActionResult Index()
        {
            return View("index");
        }

    }
}
