using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Widget.Params
{
    public class WidgetDeleteParams
    {
        public int WidgetId { get; set; }
        public int StoryBoardId { get; set; }
        public int WidgetType { get; set; }
    }
}
