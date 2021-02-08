using LocalUndergroundServer.Features.Widget.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Widget.Models
{
    public class WidgetBase
    {
        public int StoryBoardId { get; set; }
        public int Sort { get; set; }
        public WidgetType WidgetType { get; set; }
    }
}
