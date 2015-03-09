using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CatExpenseFront.Controllers.Base;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using CatExpenseFront.Models;

namespace CatExpenseFront.Controllers
{
    public class ErrorController: BaseController
    {
        private IErrorService service;
        private bool isTest;
        

        public ErrorController(){
            service = new ErrorService();
        }

        public ErrorController(IErrorService errorService)
        {
            this.service = errorService;
        }
        public ErrorController(IErrorService errorService, bool _isTest)
        {
            this.service = errorService;
            this.isTest = _isTest;
        }

        [HttpPost]
        [ResponseType(typeof(Error))]
        [Route("api/Error")]
        public HttpResponseMessage Post(Error error)
        {
            if(this.isTest == false || this.isTest == null)
            {
                this.checkSession(); 
            }
                      

            if( error != null){
                error.DateCreated = DateTime.Now;
            }

            service.Create(error);
            service.SaveChanges();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);
            return response;
        }
    }
}