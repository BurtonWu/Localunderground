using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Infrastructure.Filters
{
    public class ModelOrNotFoundActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            //action result turns to object result when data gets sent out
            if(context.Result is ObjectResult result)
            {
                if(result.Value == null)
                {
                    context.Result = new NotFoundResult();
                }
            }
        }
    }
}
