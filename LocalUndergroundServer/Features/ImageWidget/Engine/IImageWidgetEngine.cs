using LocalUndergroundServer.Features.Billboard.Constants;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.ImageWidget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.ImageWidget.Engine
{
    public interface IImageWidgetEngine
    {
        Task<List<ImageWidgetModel>> GetImageWidgetModels(string userId, int storyBoardId);
    }
}
