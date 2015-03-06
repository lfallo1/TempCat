using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using CatExpenseFront.Repository;
using CatExpenseFront.Controllers.Base;
using System.Web;
using CatExpenseFront.App_Start;


namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Crud on Line Items
    /// </summary>
    public class LineItemController : BaseController
    {
        private ILineItemService service;
        private IReceiptService receiptService;
        private ISubmissionService submissionService;

        /// <summary>
        /// Default Construcor
        /// </summary>
        public LineItemController()
        {
            service = new LineItemService();
            receiptService = new ReceiptService();
            submissionService = new SubmissionService();
        }

        /// <summary>
        /// Construcor that accepts line item service
        /// </summary>
        /// <param name="iService"></param>
        public LineItemController(ILineItemService iService, ISubmissionService iSubmissionService)
        {
            if (this.service == null)
            {
                service = iService;
                receiptService = new ReceiptService(new Repository<Receipt>());
                submissionService = iSubmissionService;
            }
        }



        /// <summary>
        ///Returns a line item by id  
        ///GET api/LineItem?id={id}
        /// </summary>
        /// <param name="id">The id of the line item.</param>
        /// <returns></returns>
        [ResponseType(typeof(LineItem))]
        public IHttpActionResult GetLineItem(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            LineItem lineitem = service.Find(id);
            if (lineitem == null)
            {
                return NotFound();
            }

            return Ok(lineitem);
        }


        /// <summary>
        /// Returns all line items by submissionId
        /// GET api/LineItem/GetLineItemsBySubmissionId?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetLineItemsBySubmissionId")]
        [Route("api/LineItem/GetLineItemsBySubmissionId")]
        public IEnumerable<LineItem> GetLineItemsBySubmissionId(int id)
        {

            //Checks the session to see if it is valid
            this.checkSession();

            List<LineItem> submissionList = new List<LineItem>();

            submissionList = (from m in service.All()
                              where (m.SubmissionId == id)
                              select m).OrderBy(s => s.LineItemDate).ToList();

            return submissionList;

        }




        /// <summary>
        /// Updates a single line item
        /// PUT api/LineItem?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <param name="lineitem"></param>
        /// <returns></returns>
        public HttpResponseMessage PutLineItem(int id, LineItem lineitem)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            if (!ModelState.IsValid || id != lineitem.LineItemId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }


            LineItem liFromDb = service.Find(id);
            liFromDb.UpdateFields(lineitem);
            service.Update(liFromDb);
            service.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, liFromDb);
        }



        /// <summary>
        /// Creates a line item
        /// POST api/LineItem/Post
        /// </summary>
        /// <param name="lineitem"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(LineItem))]
        public HttpResponseMessage Post(LineItem lineitem)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            if (lineitem != null)
            {
                lineitem.DateCreated = DateTime.Now;
                lineitem.DateUpdated = DateTime.Now;
            }

            //check if the Submission has reciepts
            int receiptIdList = (from m in receiptService.All()
                                 where m.LineItemId == lineitem.LineItemId
                                 select m).ToList<Receipt>().Count;

            lineitem.ReceiptPresent = receiptIdList > 0;

            service.Create(lineitem);
            service.SaveChanges();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, service.Find(lineitem.LineItemId));
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = lineitem.LineItemId }));
            return response;
        }


        /// <summary>
        /// Deletes a single line item by id
        /// DELETE api/LineItem?id={id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(LineItem))]
        public HttpResponseMessage DeleteLineItem(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            LineItem lineitem = service.Find(id);
            Submission submission = submissionService.Find(lineitem.SubmissionId);
            string currentUser = (null == HttpContextFactory.Current.Session["UserName"]
                                 ? "" : HttpContextFactory.Current.Session["UserName"].ToString().ToUpper());
            if (lineitem == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);                
            }
            if (submission.ActiveDirectoryUser.ToUpper() == currentUser)
            {
                List<Receipt> receiptList = (from m in receiptService.All()
                                             where m.LineItemId == lineitem.LineItemId
                                             select m).ToList<Receipt>();
                foreach (Receipt receipt in receiptList)
                {
                    receiptService.Delete(receipt);
                    receiptService.SaveChanges();
                }
                service.Delete(lineitem);
                service.SaveChanges();
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }            

            return Request.CreateResponse(HttpStatusCode.OK, lineitem);
        }
    }
}