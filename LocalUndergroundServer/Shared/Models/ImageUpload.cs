﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Shared.Models
{
    public class ImageUpload
    {
        public IFormFile Image { get; set; }
    }
}
