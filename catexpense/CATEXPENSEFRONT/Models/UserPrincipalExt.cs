using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Web;

namespace CatExpenseFront.Models
{
    /// <summary>
    /// Used to communicate with active directory.
    /// </summary>
    [DirectoryRdnPrefix("CN")]
    [DirectoryObjectClass("Person")]
    public class UserPrincipalExt : UserPrincipal
    {
        
        /// <summary>
        /// Implement the constructor using the base class constructor
        /// </summary>
        /// <param name="context"></param>
        public UserPrincipalExt(PrincipalContext context)
            : base(context)
        { }

       
        /// <summary>
        /// Implement the constructor with initialization parameters.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="samAccountName"></param>
        /// <param name="password"></param>
        /// <param name="enabled"></param>
        public UserPrincipalExt(PrincipalContext context,
                                string samAccountName,
                                string password,
                                bool enabled)
            : base(context, samAccountName, password, enabled)
        { }

         
        /// <summary>
        /// Create the "Manager" property
        /// </summary>
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

       
        /// <summary>
        /// Implement the overloaded search method FindByIdentity.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="identityValue"></param>
        /// <returns></returns>
        public static new UserPrincipalExt FindByIdentity(PrincipalContext context, string identityValue)
        {
            return (UserPrincipalExt)FindByIdentityWithType(context, typeof(UserPrincipalExt), identityValue);
        }

      
        /// <summary>
        /// Implement the overloaded search method FindByIdentity.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="identityType"></param>
        /// <param name="identityValue"></param>
        /// <returns></returns>
        public static new UserPrincipalExt FindByIdentity(PrincipalContext context, IdentityType identityType, string identityValue)
        {
            return (UserPrincipalExt)FindByIdentityWithType(context, typeof(UserPrincipalExt), identityType, identityValue);
        }
    }
}