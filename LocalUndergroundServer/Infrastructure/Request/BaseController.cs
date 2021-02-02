using LocalUndergroundServer.Infrastructure.Extensions.Startup;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.Request
{
    public class BaseController : Controller
    {
        public string UserId;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            //Get user id   
            UserId = User.GetClaim(ClaimTypes.NameIdentifier);
        }
    }
}
