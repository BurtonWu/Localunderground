using LocalUndergroundServer.Features.Widget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.ImageWidget.Models
{
    public class ImageWidgetModel : WidgetBase
    {
        public int Id { get; set; }
        public List<ImageData> ImageData { get; set; }
    }
}
