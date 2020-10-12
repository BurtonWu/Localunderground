using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.Extensions.Startup
{
    public static class ModelResponseExtensions
    {
        public static ActionResult<T> OrNotFound<T>(this T obj)
        {
            if (obj == null) return new NotFoundResult();
            return obj;
        }
    }
}
