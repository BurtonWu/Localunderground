using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Data.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndgroundServer.Data.Models.Panel
{
    public class PanelCore
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public BillboardCore Billboard { get; set; }
        //public IEnumerable<PanelImage> PanelImages { get; set; }
    }
}
