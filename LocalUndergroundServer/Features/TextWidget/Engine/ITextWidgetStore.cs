using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public interface ITextWidgetStore
    {
        Task<int?> AddTextWidget(int storyBoardId, int sort, string body = "");
        Task<bool> UpdateTextWidget(int textWidgetId, int storyBoardId, int sort, string body = "");
        //Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData);
    }
}
