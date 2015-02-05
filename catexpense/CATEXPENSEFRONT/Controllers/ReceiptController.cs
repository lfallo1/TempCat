﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.ViewModels;
using CatExpenseFront.Services.Interfaces;
using CatExpenseFront.Services;
using System.IO;
using CatExpenseFront.Controllers.Base;


namespace CatExpenseFront.Controllers
{
    /// <summary>
    /// Controller used to crud receipts
    /// </summary>
    public class ReceiptController : BaseController
    {
        private IReceiptService service;
        private ILineItemService lineItemService;

        /// <summary>
        /// Default Construcor
        /// </summary>
        public ReceiptController()
        {
            service = new ReceiptService();
            lineItemService = new LineItemService();
        }

        /// <summary>
        /// Construcor that accepts receipt service and line item service
        /// </summary>
        /// <param name="iService"></param>
        /// <param name="ilineItemService"></param>
        public ReceiptController(IReceiptService iService, ILineItemService ilineItemService)
        {
            if (service == null)
            {
                service = iService;
            }
            if (lineItemService == null)
            {
                lineItemService = ilineItemService;
            }
        }


        /// <summary>
        /// GET api/Receipt/5  Returns a receipt by Id
        /// </summary>
        /// <param name="id">The id of the receipt</param>
        [HttpGet]
        [ActionName("GetReceipt")]
        [Route("api/Receipts")]
        public void GetReceiptByUniqueId(int id)
        {

            //Checks the session to see if it is valid
            this.checkSession();

            Receipt r = service.Find(id);

            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + r.Name);
            BinaryWriter bw = new BinaryWriter(HttpContext.Current.Response.OutputStream);
            bw.Write(r.ReceiptImage);
            bw.Close();
            HttpContext.Current.Response.ContentType = "image/" + r.Type;
            HttpContext.Current.Response.End();

        }


        /// <summary>
        /// POST api/Receipt
        /// Uploads a receipt file to the server
        /// </summary>
        [HttpPost]
        [ActionName("CreateReceipt")]
        [Route("api/Receipts/")]
        public Receipt FileUpload(Receipt receipt)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            receipt.DateCreated = DateTime.Now;
            byte[] binaryData = System.Convert.FromBase64String(receipt.Base64String);
            receipt.ReceiptImage = binaryData;


            LineItem lineItem = lineItemService.Find(receipt.LineItemId);
            lineItem.ReceiptPresent = true;

            service.Create(receipt);
            service.SaveChanges();

            lineItemService.Update(lineItem);
            lineItemService.SaveChanges();

            return receipt;
        }

        /// <summary>
        /// Returns a list of reciepts by submission id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetReceiptsWithImageBySubmissionId")]
        [Route("api/Receipt/GetReceiptsWithImageBySubmissionId")]
        public List<Receipt> GetReceiptsWithImageBySubmissionId(int id)
        {
            return GetAllReceiptsBySubmissionId(id);
        }
        
        /// <summary>
        /// Returns all the receipt items associated with 
        /// all line items associated with a given submission
        /// </summary>
        /// <param name="id">id of the submission to get line items from</param>
        /// <returns></returns>
        private List<Receipt> GetAllReceiptsBySubmissionId(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<LineItem> lineItemList = (from m in lineItemService.All()
                                           where m.SubmissionId == id
                                           select m).ToList();

            List<Receipt> receiptList = new List<Receipt>();

            foreach (LineItem li in lineItemList)
            {
                receiptList.AddRange(from m in service.All()
                                     where m.LineItemId == li.LineItemId
                                     select m);
            }

            return receiptList;
        }

        // GET api/Receipt/GetReceiptIdsBySubmissionId/5
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetReceiptsBySubmissionId")]
        [Route("api/Receipt/GetReceiptsBySubmissionId")]
        public List<ReceiptWithoutImage> GetReceiptIdsBySubmissionId(int id)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            List<Receipt> receiptList = GetAllReceiptsBySubmissionId(id);

            List<ReceiptWithoutImage> receiptWithoutImageList = receiptList.Select(
                receipt => new ReceiptWithoutImage
                {
                    ReceiptId = receipt.ReceiptId,
                    FileName = receipt.Name
                }
                ).ToList<ReceiptWithoutImage>();

            return receiptWithoutImageList;
        }


        /// <summary>
        /// Delete a reciept by Id. DELETE api/Receipt?id={id}&lineItemId={lineItemId}&receiptNotPresent={receiptNotPresent} 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="lineItemId"></param>
        /// <param name="receiptNotPresent"></param>
        /// <returns></returns>
        [HttpDelete]
        [ActionName("DeleteReceipt")]
        [Route("api/Receipts/")]
        [ResponseType(typeof(Receipt))]
        public HttpResponseMessage DeleteReceipt(int id, int lineItemId)
        {
            //Checks the session to see if it is valid
            this.checkSession();

            Receipt receipt = service.Find(id);
            LineItem lineItem = lineItemService.Find(lineItemId);
            if (null != receipt)
            {
                service.Delete(receipt);
                service.SaveChanges();
                if (lineItem.Receipts.Count == 0)
                {
                    lineItem.ReceiptPresent = false;
                    lineItemService.SaveChanges();
                }

            }

            return Request.CreateResponse(HttpStatusCode.OK, receipt);
        }

    }
}