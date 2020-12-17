using LocalUndergroundServer.Data;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Shared.Models;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.Widget.Models;
using LocalUndergroundServer.Features.Widget.Constants;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public class WidgetEngine : IWidgetEngine
    {
        private readonly DatabaseContext _context;
        private readonly IWidgetStore _textWidgetStore;

        public WidgetEngine(
            DatabaseContext context,
            IWidgetStore widgetStore
            )
        {
            _context = context;
            _textWidgetStore = widgetStore;
        }

        public async Task<bool> SortWidgets(IEnumerable<WidgetSortModel> widgetSorts)
        {
            var updateCount = await _textWidgetStore.SortWidgets(widgetSorts);
            return updateCount == widgetSorts.Count();
        }


    }

}
