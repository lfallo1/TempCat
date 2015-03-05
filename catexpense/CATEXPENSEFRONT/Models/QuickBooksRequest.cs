using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CatExpenseFront.Models
{
    public class QuickBooksRequest
    {
        private const string LOGIN_URL = "https://accounts.intuit.com/iamticketsclient/sign_in";
        private const string APP_URL = "https://sandbox.qbo.intuit.com/app/homepage";
        private const string EXPENSE_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/purchsales/save";
        private const string VENDOR_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/lists/name/list?nameType=vendor&includeNameOnly=true&sort=+fullname";
        private const string CLIENT_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/lists/name/list?nameType=customer&includeNameOnly=true&sort=+fullname";
        private const string COMPANYNAME = "CatalystIT";
        private const string LOGINNAME = "mnorris@catalystitservices.com";
        private const string PASSWORD = "Catalyst12";
        private const string NAMESPACEID = "50000003";
        private const string REQUEST_METHOD_POST = "POST";

        private static readonly JsonSerializer jsonSerializer = new JsonSerializer();
        private static IQbVendorService vendorService = new QbVendorService();
        private static IQbClientService clientService = new QbClientService();

        /// <summary>
        /// Setup the Replicon credentials needed for the api calls
        /// </summary>
        /// <returns></returns>
        public static HttpWebRequest Login(String url)
        {
            CookieContainer cc = new CookieContainer();
            JObject responseInfo = null;

            JObject login = new JObject();
            login["username"] = LOGINNAME;
            login["password"] = PASSWORD;
            login["namespaceId"] = NAMESPACEID;

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(LOGIN_URL);
            request.CookieContainer = cc;
            request.Method = REQUEST_METHOD_POST;
            request.ContentType = "application/json; charset=utf-8";

            using (Stream requestStream = request.GetRequestStream())
            using (StreamWriter writer = new StreamWriter(requestStream, Encoding.UTF8))
                jsonSerializer.Serialize(writer, login);

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            using (Stream responseStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(response.CharacterSet)))
                responseInfo = (JObject)jsonSerializer.Deserialize(new JsonTextReader(reader));

            cc.Add(response.Cookies);
                

            HttpWebRequest cookieRequest = (HttpWebRequest)WebRequest.Create(APP_URL);
            cookieRequest.Method = "GET";
            cookieRequest.CookieContainer = cc;

            cookieRequest.Headers.Add("CsrfToken", responseInfo["iamTicket"]["ticket"].ToString());
            
            HttpWebResponse secondResponse = (HttpWebResponse)cookieRequest.GetResponse();

            cc.Add(secondResponse.Cookies);

            HttpWebRequest authenticatedRequest = (HttpWebRequest)WebRequest.Create(url);
            authenticatedRequest.Method = "GET";
            authenticatedRequest.ContentType = "application/json; charset=utf-8";
            authenticatedRequest.CookieContainer = cc;

            authenticatedRequest.Headers.Add("CsrfToken", responseInfo["iamTicket"]["ticket"].ToString());

            return authenticatedRequest;

        }
        private static void DeleteAll()
        {
            foreach (QbClient qb in clientService.All())
            {
                clientService.Delete(qb);

            }
            foreach (QbVendor qb in vendorService.All())
            {
                vendorService.Delete(qb);
            }
            clientService.SaveChanges();
            vendorService.SaveChanges();
        }
        public static void Sync()
        {
            DeleteAll();
            JArray jArray = null;

            HttpWebResponse vendorResponse = (HttpWebResponse)Login(VENDOR_URL).GetResponse();
            using (Stream responseStream = vendorResponse.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(vendorResponse.CharacterSet)))
                jArray = (JArray)jsonSerializer.Deserialize(new JsonTextReader(reader));

            foreach (JObject obj in jArray)
            {
                vendorService.Create(new QbVendor(Convert.ToInt32(obj.GetValue("id")), ((JObject)obj.GetValue("fullName")).GetValue("fullName").ToString()));
            }
            vendorService.SaveChanges();

            HttpWebResponse clientResponse = (HttpWebResponse)Login(CLIENT_URL).GetResponse();
            using (Stream responseStream = clientResponse.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(clientResponse.CharacterSet)))
                jArray = (JArray)jsonSerializer.Deserialize(new JsonTextReader(reader));

            foreach (JObject obj in jArray)
            {
                clientService.Create(new QbClient(Convert.ToInt32(obj.GetValue("id")), ((JObject)obj.GetValue("fullName")).GetValue("fullName").ToString()));
            }
            clientService.SaveChanges();
        }


        public static JObject CreateExpense(HttpWebRequest request)
        {
            JObject responseInfo = null;
            JObject apiAction = new JObject();


            JObject accountDetail = new JObject();
            accountDetail["amount"] = "100.0";
            accountDetail["accountId"] = "7";
            accountDetail["billable"] = true;
            accountDetail["customerId"] = null;
            accountDetail["depositsAccountId"] = null;
            accountDetail["description"] = "dfsdf";
            accountDetail["employeeId"] = null;
            accountDetail["isSale"] = false;
            accountDetail["itemId"] = null;
            accountDetail["klassId"] = null;
            accountDetail["locationId"] = null;
            accountDetail["markup"] = "";
            accountDetail["nameId"] = null;
            accountDetail["netAmount"] = null;
            accountDetail["order"] = 1;
            accountDetail["paymentMethodId"] = null;
            accountDetail["quantity"] = "";
            accountDetail["rate"] = "";
            accountDetail["receivedFromId"] = null;
            accountDetail["ref"] = "";
            accountDetail["sequence"] = null;
            accountDetail["sourceTxnId"] = null;
            accountDetail["sourceTxnSequence"] = null;
            accountDetail["sourceTxnTypeId"] = null;
            accountDetail["taskStatusId"] = null;
            accountDetail["taxAmount"] = null;
            accountDetail["taxCodeId"] = null;
            accountDetail["taxable"] = false;
            accountDetail["vendorId"] = null;

            JArray accountDetails = new JArray(accountDetail);


            apiAction["accountDetails"] = accountDetail;



            // Send API request in JSON format 
            using (Stream requestStream = request.GetRequestStream())
            using (StreamWriter writer = new StreamWriter(requestStream, Encoding.UTF8))
                jsonSerializer.Serialize(writer, apiAction);

            // Receive API request and convert into JSON objects 
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream responseStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(response.CharacterSet)))
                responseInfo = (JObject)jsonSerializer.Deserialize(new JsonTextReader(reader));
            return responseInfo;


        }



        /// <summary>
        /// Perform the API request
        /// </summary>
        /// <param name="apiAction"></param>
        /// <returns>Deserialized response from Replicon</returns>
        public static JObject PerformApiRequest()
        {
            HttpWebRequest authenticatedRequest = QuickBooksRequest.Login(EXPENSE_URL);
            JObject responseInfo = null;

            // Send API request in JSON format 
            responseInfo = QuickBooksRequest.CreateExpense(authenticatedRequest);

            return responseInfo;
        }
    }
}
