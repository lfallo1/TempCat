using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    [DirectoryRdnPrefix("CN")]
    [DirectoryObjectClass("Person")]
    public class UserPrincipalExt : UserPrincipal
    {
        // Implement the constructor using the base class constructor
        public UserPrincipalExt(PrincipalContext context)
            : base(context)
        { }

        // Implement the constructor with initialization parameters.
        public UserPrincipalExt(PrincipalContext context,
                                string samAccountName,
                                string password,
                                bool enabled)
            : base(context, samAccountName, password, enabled)
        { }

        // Create the "Manager" property
        [DirectoryProperty("manager")]
        public string Manager
        {
            get
            {
                if (ExtensionGet("manager").Length != 1)
                    return string.Empty;

                return (string)ExtensionGet("manager")[0];
            }
            set { ExtensionSet("manager", value); }
        }

        // Implement the overloaded search method FindByIdentity.
        public static new UserPrincipalExt FindByIdentity(PrincipalContext context, string identityValue)
        {
            return (UserPrincipalExt)FindByIdentityWithType(context, typeof(UserPrincipalExt), identityValue);
        }

        // Implement the overloaded search method FindByIdentity.
        public static new UserPrincipalExt FindByIdentity(PrincipalContext context, IdentityType identityType, string identityValue)
        {
            return (UserPrincipalExt)FindByIdentityWithType(context, typeof(UserPrincipalExt), identityType, identityValue);
        }
    }
}