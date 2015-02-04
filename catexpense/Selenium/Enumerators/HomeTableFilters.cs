using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.Enumerators
{
    public enum EmployeeFilter
    {
        All,
        In_Progress,
        Submitted,
        Manager_Approved,
        Manager_Rejected,
        Finance_Approved,
        Finance_Rejected
    }

    public enum FinanceFilter
    {
        All,
        Manager_Approved
    }
}
