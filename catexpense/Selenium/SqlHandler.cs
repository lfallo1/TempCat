using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace Selenium
{
    public class SqlHandler
    {
        private const string BaseConnectionString =
            "Data Source={0};User ID={1};Password={2};+Initial Catalog={3}";

        private string _wholeConnectionString = string.Empty;
        private string ConnectionString
        {
            get
            {
                return string.IsNullOrEmpty(_wholeConnectionString) ?
                    string.Format(BaseConnectionString, ServerName,
                        UserName, Password, DatabaseName) :
                    _wholeConnectionString;
            }
            set
            {
                _wholeConnectionString = value;
            }
        }

        private string UserName = string.Empty;
        private string Password = string.Empty;
        private string ServerName = string.Empty;
        private string DatabaseName = string.Empty;



        public SqlHandler(string username, string password, string server, string db)
        {
            UserName = username;
            Password = password;
            ServerName = server;
            DatabaseName = db;


        }

        public SqlHandler(string wholeConnectionString)
        {
            ConnectionString = wholeConnectionString;
        }

        public DataTable RunScript(string script)
        {
            DataTable dtResult = new DataTable();
            SqlConnection conn = null;
            try
            {
                conn = new SqlConnection(ConnectionString);
                conn.ConnectionString = ConnectionString;
                conn.Open();

                var SQLDataAdapter = new SqlDataAdapter(script, conn);
                SQLDataAdapter.Fill(dtResult);

                SQLDataAdapter.Dispose();
            }
            catch (Exception ex)
            {
                var connectionError =
                    "An error occurred while trying to connect to the server.\n\n{0}";
                var errorMessage = string.Format(connectionError, ex.Message);
                Console.WriteLine(errorMessage);

            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                    conn.Dispose();
                }
            }

            return dtResult;
        }

        public List<string> GetAllOfSpecificColumn(DataTable table, string column)
        {
            var columnContents = new List<string>();

            foreach (DataRow row in table.Rows)
            {
                columnContents.Add(row[column].ToString());
            }

            return columnContents;
        }

        public void RunUpdateScript(String script)
        {

            SqlConnection conn = null;
            SqlCommand cmd = new SqlCommand(script, conn);
            try
            {
                conn = new SqlConnection(ConnectionString);
                cmd.ExecuteNonQuery();
            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
        }
    }
}
