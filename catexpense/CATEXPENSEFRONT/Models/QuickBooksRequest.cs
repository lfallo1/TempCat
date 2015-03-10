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
        private const string EXPENSE_INFO_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/purchsales/-1?txnTypeId=54";
        private const string EXPENSE_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/purchsales/save";
        private const string VENDOR_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/lists/name/list?nameType=vendor&includeNameOnly=true&sort=+fullname";
        private const string CLIENT_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/lists/name/list?nameType=customer&includeNameOnly=true&sort=+fullname";
        private const string ACCOUNT_URL = "https://sandbox.qbo.intuit.com/qbo50/neoservice/lists/account/list?includeDeleted=false&sort=+type";
        private const string COMPANYNAME = "CatalystIT";
        private const string LOGINNAME = "mnorris@catalystitservices.com";
        private const string PASSWORD = "Catalyst12";
        private const string NAMESPACEID = "50000003";
        private const string REQUEST_METHOD_GET = "GET";
        private const string REQUEST_METHOD_POST = "POST";

        private static readonly JObject EMPTY_FORM = JObject.Parse("{\"saveBackToTemplate\":false,\"txnId\":-1,\"editSequence\":0,\"nameId\":\"\",\"accountId\":\"\",\"accountBalance\":\"\",\"memo\":\"\",\"isVoided\":false,\"date\":\"\",\"closeBooksPassword\":\"\",\"attachments\":null,\"deptId\":null,\"klassId\":\"\",\"itemDetails\":[],\"accountDetails\":[],\"referenceNumber\":null,\"customVal1\":\"\",\"customVal2\":\"\",\"customVal3\":\"\",\"payeeMessage\":\"\",\"billingAddress\":\"\",\"termId\":null,\"dueDate\":\"\",\"enableSelfService\":null,\"isEinvoice\":false,\"isEnterpriseCustomer\":false,\"ignoreDuplicateDocNum\":null,\"ignoreModifyTaxFiledTxnWarn\":false,\"currencyType\":{\"isoCode\":\"USD\",\"symbol\":\"$\",\"displayName\":\"United States Dollar\"},\"exchangeRateInfo\":{\"exchangeRate\":\"0.00\",\"editSequence\":0},\"deliveryInfo\":{\"deliveryAddress\":\"\",\"toBePrinted\":false,\"toBeSent\":false,\"deliverySaveAddress\":false,\"deliveryType\":\"Dont\",\"deliveryEmailSubject\":\"\",\"deliveryEmailBody\":\"\"},\"discountInfo\":{\"discountAccountId\":null,\"discountAmount\":\"\",\"discountPercent\":\"0.00%\",\"discountTaxable\":false},\"payment\":{\"usesMAS\":false,\"paymentMethodId\":\"\",\"checkNumber\":\"\",\"depositAmount\":\"\",\"creditCardInfo\":{\"nameOnCreditCard\":\"\",\"creditCardAddress\":\"\",\"creditCardZip\":\"\",\"creditCardExpMonth\":\"\",\"creditCardExpYear\":\"\",\"creditCardNumber\":\"\",\"creditCardCVV2\":\"\",\"creditCardInfo\":\"Enter credit card details\",\"track2Data\":\"\",\"track2App\":\"\"},\"masInfo\":{\"masRequest\":{\"processMas\":false,\"retryMas\":false,\"reverseMas\":false}}},\"tdsInfo\":{\"tdsAmount\":\"\",\"tdsCompositeMappingId\":null,\"hasTDSEnabled\":false},\"enableOnlinePayment\":false,\"enableOnlineCCPayment\":false,\"enableOnlineBankPayment\":false,\"showCustomize\":false,\"jobStatusId\":null,\"permitNumber\":\"\",\"printPrefId\":null,\"defaultTxnSubTypeId\":null,\"taxFormNum\":\"\",\"txnTaxFormType\":\"\",\"acceptStatus\":{\"statusId\":\"1\",\"acceptedDate\":null,\"acceptedBy\":\"\",\"expirationDate\":null},\"roundoffInfo\":{\"hasUserSetRoundoff\":false},\"txnTypeId\":54,\"fullReadPriorSavedTxn\":true,\"associatedSourceTxn\":null}");
        private static readonly JObject EMPTY_ACCOUNT_DETAILS = JObject.Parse("{\"itemId\":null,\"accountId\":\"\",\"klassId\":null,\"taskStatusId\":null,\"locationId\":null,\"customerId\":null,\"employeeId\":null,\"vendorId\":null,\"nameId\":null,\"description\":\"\",\"quantity\":\"\",\"rate\":\"\",\"amount\":\"\",\"taxable\":false,\"isSale\":false,\"taxCodeId\":null,\"billable\":false,\"markup\":\"\",\"depositsAccountId\":null,\"receivedFromId\":null,\"paymentMethodId\":null,\"ref\":\"\",\"journalCodeId\":null,\"order\":0,\"taxAmount\":null,\"netAmount\":null,\"sequence\":null,\"sourceTxnSequence\":null,\"sourceTxnId\":null,\"sourceTxnTypeId\":null}");
        private static readonly JsonSerializer jsonSerializer = new JsonSerializer();
        private static IQbVendorService vendorService = new QbVendorService();
        private static IQbClientService clientService = new QbClientService();
        private static IQbAccountService accountService = new QbAccountService();

        /// <summary>
        /// Setup the cookies/headers required to interact with the quickbooks api
        /// </summary>
        /// <returns></returns>
        public static HttpWebRequest Login(string url, string type)
        {
            CookieContainer cc = new CookieContainer();
            JObject responseInfo = null;
            // Set up the login credentials
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

            //This call is required to gather the rest of the cookie data to interact with the QB api.
            HttpWebRequest cookieRequest = (HttpWebRequest)WebRequest.Create(APP_URL);
            cookieRequest.Method = "GET";
            cookieRequest.CookieContainer = cc;

            // This data is the primary header required for all the calls to the Quickbooks sandbox
            cookieRequest.Headers.Add("CsrfToken", responseInfo["iamTicket"]["ticket"].ToString());

            HttpWebResponse secondResponse = (HttpWebResponse)cookieRequest.GetResponse();

            cc.Add(secondResponse.Cookies);

            // Now we create the request to be passed back using the url and method passed in
            // This call should, generally speaking, be completely ready to go (just call .GetResponse())
            HttpWebRequest finalRequest = (HttpWebRequest)WebRequest.Create(url);
            finalRequest.Method = type;
            finalRequest.ContentType = "application/json; charset=utf-8";
            finalRequest.CookieContainer = cc;

            finalRequest.Headers.Add("CsrfToken", responseInfo["iamTicket"]["ticket"].ToString());

            return finalRequest;
        }
        /// <summary>
        /// This method should delete all the records in the database pertaining to the clients, 
        /// vendors and accounts.  It is privatized, and should only ever be called at the start of a Sync
        /// </summary>
        private static void DeleteAll()
        {
            foreach (QbClient qb in clientService.All().ToList<QbClient>())
            {
                clientService.Delete(qb);
            }
            foreach (QbVendor qb in vendorService.All().ToList<QbVendor>())
            {
                vendorService.Delete(qb);
            }
            foreach (QbAccount qb in accountService.All().ToList<QbAccount>())
            {
                accountService.Delete(qb);
            }
            clientService.SaveChanges();
            vendorService.SaveChanges();
            accountService.SaveChanges();
        }
        /// <summary>
        /// This should sync up all names and Ids from the quickbooks sandbox
        /// </summary>
        public static void Sync()
        {
            DeleteAll();
            JArray jArray = null;
            // Do a login/validation with the vendor url (for mass grab)
            HttpWebResponse vendorResponse = (HttpWebResponse)Login(VENDOR_URL, REQUEST_METHOD_GET).GetResponse();
            using (Stream responseStream = vendorResponse.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(vendorResponse.CharacterSet)))
                jArray = (JArray)jsonSerializer.Deserialize(new JsonTextReader(reader));
            // Go object by object and convert the data into vendors
            foreach (JObject obj in jArray)
            {
                vendorService.Create(new QbVendor(Convert.ToInt32(obj["id"]), obj["fullName"]["fullName"].ToString()));
            }
            vendorService.SaveChanges();
            //Repeat for clients
            HttpWebResponse clientResponse = (HttpWebResponse)Login(CLIENT_URL, REQUEST_METHOD_GET).GetResponse();
            using (Stream responseStream = clientResponse.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(clientResponse.CharacterSet)))
                jArray = (JArray)jsonSerializer.Deserialize(new JsonTextReader(reader));

            foreach (JObject obj in jArray)
            {
                clientService.Create(new QbClient(Convert.ToInt32(obj["id"]), obj["fullName"]["fullName"].ToString()));
            }
            clientService.SaveChanges();
            // Repeat for accounts
            HttpWebResponse accountResponse = (HttpWebResponse)Login(ACCOUNT_URL, REQUEST_METHOD_GET).GetResponse();
            using (Stream responseStream = accountResponse.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding(accountResponse.CharacterSet)))
                jArray = (JArray)jsonSerializer.Deserialize(new JsonTextReader(reader));

            foreach (JObject obj in jArray)
            {
                accountService.Create(new QbAccount(Convert.ToInt32(obj["id"]), obj["name"].ToString().Trim()));
            }
            accountService.SaveChanges();
        }
        /// <summary>
        /// This method will be the primary access point to the expense report api in Quickbooks
        /// </summary>
        /// <param name="nameId"> The number stored in the QbVendors table relating to the user </param>
        /// <param name="date"> The date to make the payment </param>
        /// <param name="description"> The description field </param>
        /// <param name="amount"> The amount field </param>
        /// <param name="accountId"> The number relating to the account to pay (Travel, Advertising, etc.) </param>
        /// <param name="customerId"> The number stored in the QbClients table relating to whom this is billable</param>
        /// <returns></returns>
        public static JObject CreateExpense(bool billable, string nameId, string date, string description, string amount, string accountId, string customerId)
        {
            JObject responseInfo = null;
            JArray allAccountDetails = new JArray();


            JObject expenseReport = new JObject(EMPTY_ACCOUNT_DETAILS);
            expenseReport["accountId"] = accountId; 
            expenseReport["customerId"] = customerId;
            expenseReport["description"] = description;
            expenseReport["amount"] = amount; 
            expenseReport["billable"] = billable; 
            expenseReport["order"] = allAccountDetails.Count + 1; 
            expenseReport["sequence"] = allAccountDetails.Count + 1;

            allAccountDetails.Add(expenseReport);

            JObject apiAction = new JObject(EMPTY_FORM);
            apiAction["nameId"] = nameId; 
            apiAction["accountId"] = "35"; //placeholder for the Id of the savings, checking, etc. account  (35 is checking in quickbooks sandbox)
            apiAction["date"] = date; 
            apiAction["dueDate"] = date;
            apiAction["accountDetails"] = allAccountDetails;

            HttpWebRequest request = Login(EXPENSE_URL, REQUEST_METHOD_POST);
            // Send API request in JSON format 
            request.ContentType = "application/json; charset=UTF-8";
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
            Sync();
            return new JObject();
            // Send API request in JSON format 
            // return QuickBooksRequest.CreateExpense(true, "56", "2015-03-17", "description", "40.00", "22", "1");
        }
    }
}
