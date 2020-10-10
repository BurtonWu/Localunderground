using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.DTO.Panel
{
    public class PanelImageDTO
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public byte[] Data { get; set; } 
    }
}
