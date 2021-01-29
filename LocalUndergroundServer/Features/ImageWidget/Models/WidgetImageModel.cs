using LocalUndergroundServer.Data.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.ImageWidget.Models
{
    public class WidgetImageModel : ByteDataModel
    {
        public int Sort { get; set; }
        public string ImageData { get; set; }
    }
}
