using LocalUndgroundServer.Data.Models.Panel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.Panel
{
    public class PanelImage
    {
        public int Id { get; set; }
        public int PanelId { get; set; }
        public string ImageUrl { get; set; }
        public PanelCore Panel { get; set; }
    }
}
