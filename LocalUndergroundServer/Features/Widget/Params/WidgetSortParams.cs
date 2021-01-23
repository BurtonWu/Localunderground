using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.Widget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Widget.Params
{
    public class WidgetSortParams
    {
        public IEnumerable<WidgetSortModel> WidgetSortModels { get; set; }
    }
}
