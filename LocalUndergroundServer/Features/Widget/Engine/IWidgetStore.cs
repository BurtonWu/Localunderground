using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.Widget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public interface IWidgetStore
    {
        Task<int> SortWidgets(IEnumerable<WidgetSortModel> widgetSorts);

        //Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData);
    }
}
