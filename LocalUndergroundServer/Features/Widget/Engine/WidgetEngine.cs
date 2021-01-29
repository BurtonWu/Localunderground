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
using LocalUndergroundServer.Features.TextWidget.Params;
using LocalUndergroundServer.Features.TextWidget.Models;
using LocalUndergroundServer.Features.ImageWidget.Engine;
using LocalUndergroundServer.Features.StoryBoard.Engine;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public class WidgetEngine : IWidgetEngine
    {
        private readonly DatabaseContext _context;
        private readonly IStoryBoardStore _storyBoardStore;
        private readonly IWidgetStore _widgetStore;
        private readonly ITextWidgetStore _textWidgetStore;
        private readonly IImageWidgetStore _imageWidgetStore;



        public WidgetEngine(
            DatabaseContext context,
            IWidgetStore widgetStore,
            ITextWidgetStore textWidgetStore,
            IStoryBoardStore storyBoardStore,
            IImageWidgetStore imageWidgetStore
            )
        {
            _context = context;
            _textWidgetStore = textWidgetStore;
            _storyBoardStore = storyBoardStore;
            _imageWidgetStore = imageWidgetStore;
            _widgetStore = widgetStore;
        }


        public async Task<bool> SortWidgets(string userId, int storyBoardId, IEnumerable<WidgetSortModel> widgetSorts)
        {
            var storyBoardExists = await _storyBoardStore.StoryBoardExists(storyBoardId, userId);
            if (!storyBoardExists) return false;

            var updateCount = await _widgetStore.SortWidgets(storyBoardId, widgetSorts);
            return updateCount == widgetSorts.Count();
        }

        public async Task<bool> DeleteWidget(string userId, int widgetId, int storyBoardId, WidgetType widgetType)
        {
            switch(widgetType)
            {
                case WidgetType.Text:
                    return await _textWidgetStore.DeleteTextWidget(userId, storyBoardId, widgetId);
                case WidgetType.Image:
                    return await _imageWidgetStore.DeleteImageWidget(userId, storyBoardId, widgetId);
                default:
                    return false;
            }
        }

      
    }

}
