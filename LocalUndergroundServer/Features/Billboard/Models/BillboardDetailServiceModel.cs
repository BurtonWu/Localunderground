using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Models
{
    public class BillboardDetailServiceModel : BillboardServiceModel
    {
        public string Description { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
    }
}
