﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Identity.Models
{
    public class LoginUserRequestModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
