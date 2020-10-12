using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Models
{
    public class BillboardBaseModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageData { get; set; }
    }
}
