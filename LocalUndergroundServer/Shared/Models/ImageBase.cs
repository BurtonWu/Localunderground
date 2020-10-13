using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Shared.Models
{
    public class ImageBase
    {
        public string Name { get; set; }
        public string ImageDataBase64 { get; set; }

    }
}
