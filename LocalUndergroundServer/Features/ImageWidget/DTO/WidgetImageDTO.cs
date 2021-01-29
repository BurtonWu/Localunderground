using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.ImageWidget.DTO
{
    public class WidgetImageDTO
    {
        public int Id { get; set; }
        public int ImageWidgetId { get; set; }
        public byte[] ImageData { get; set; }
        public int Sort { get; set; }
    }
}
