using LocalUndergroundServer.Features.TextWidget.Models;
using LocalUndergroundServer.Features.Widget.Constants;
using LocalUndergroundServer.Features.Widget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public interface IWidgetEngine
    {
        Task<bool> SortWidgets(string userId, int storyBoardId, IEnumerable<WidgetSortModel> WidgetSorts);
        Task<bool> DeleteWidget(string userId, int widgetId, int storyBoardId, WidgetType widgetType);
    }
}
