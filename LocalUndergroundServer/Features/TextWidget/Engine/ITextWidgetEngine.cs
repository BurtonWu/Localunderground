using LocalUndergroundServer.Features.Billboard.Constants;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.TextWidget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public interface ITextWidgetEngine
    {
        Task<List<TextWidgetModel>> GetTextWidgetModels(int storyBoardId);
    }
}
