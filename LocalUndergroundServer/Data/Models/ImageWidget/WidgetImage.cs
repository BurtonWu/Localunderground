using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.ImageWidget
{
    public class WidgetImage
    {
        public int ID { get; set; }
        public int ImageWidgetID { get; set; }
        public int Sort { get; set; }
        public int Size { get; set; }
        public byte[] ImageData { get; set; }
    }
}
