using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel.Models
{
    public class PanelDetailServiceModel : PanelServiceModel
    {
        public string Description { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
    }
}
