using LocalUndergroundServer.Features.Widget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Models
{
    public class TextWidgetModel : WidgetBase
    {
        public int Id { get; set; }
        public string Body { get; set; }
    }
}
