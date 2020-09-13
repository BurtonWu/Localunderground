﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Features.Identity.Engine
{
    public interface IIdentityEngine
    {
        public string GenerateJwtToken(string secret, string userId, string userName);
    }
}
