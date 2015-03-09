﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CatExpenseFront
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            
            routes.MapRoute(
              name: "HotTowelMvc",
              url: "{controller}/{action}/{id}",
              defaults: new
              {
                  controller = "Home",
                  action = "Index",
                  id = UrlParameter.Optional
              }
            );
        }
    }
}