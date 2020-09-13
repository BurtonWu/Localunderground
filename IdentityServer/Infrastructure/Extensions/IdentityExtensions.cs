using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServer.Infrastructure.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetClaim(this ClaimsPrincipal cp, string claimType) 
            => cp.Claims
            .FirstOrDefault(x => x.Type == claimType)
            ?.Value;
    }
}
