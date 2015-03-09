using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using CatExpenseFront.Controllers.Base;
using CatExpenseFront.Models;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces;
using Newtonsoft.Json.Linq;

namespace CatExpenseFront.Controllers
{
    public class QboController : BaseController
    {
        private IQbVendorService vendorService;
        private IQbClientService clientService;

        /// <summary>
        /// Default Constructor
        /// </summary>
        public QboController()
        {
            vendorService = new QbVendorService();
            clientService = new QbClientService();
        }


        /// <summary>
        /// Constructor that accepts Category service
        /// </summary>
        /// <param name="iService"></param>
        /*public QboController(IQbVendorService iVendorService, IQbClientService iClientService)
        {
            vendorService = iVendorService;
            clientService = iClientService;
        }*/
        [HttpGet]
        [ActionName("qbo")]
        [Route("api/qbo/")]
        public void GetQbo()
        {
            QuickBooksRequest.PerformApiRequest();
        }

    }
}