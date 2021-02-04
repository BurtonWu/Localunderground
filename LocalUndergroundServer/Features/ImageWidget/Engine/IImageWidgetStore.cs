using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.ImageWidget.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Data.Shared;
using LocalUndergroundServer.Features.ImageWidget.Models;

namespace LocalUndergroundServer.Features.ImageWidget.Engine
{
    public interface IImageWidgetStore
    {
        Task<List<WidgetImageDTO>> GetWidgetImages(int imageWidgetId, int? id = null);
        Task<List<WidgetImageDTO>> GetWidgetImages(IEnumerable<int> imageWidgetIds);
        Task<List<ImageWidgetCoreDTO>> GetImageWidgetCores(int storyBoardId, int? id = null);
        Task<int?> CreateImageWidget(string userId, int storyBoardId, int sort, IEnumerable<ImageData> imageData);
        Task<bool> UpdateImageWidget(string userId, int imageWidgetId, int storyBoardId, int sort, IEnumerable<ImageData> imageData);
        Task<bool> DeleteImageWidget(string userId, int storyBoardId, int imageWidgetId);
    }
}
