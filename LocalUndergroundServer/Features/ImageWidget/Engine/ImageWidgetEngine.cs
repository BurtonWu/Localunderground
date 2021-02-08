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
using LocalUndergroundServer.Features.ImageWidget.Models;
using LocalUndergroundServer.Features.Widget.Constants;

namespace LocalUndergroundServer.Features.ImageWidget.Engine
{
    public class ImageWidgetEngine : IImageWidgetEngine
    {
        private readonly DatabaseContext _context;
        private readonly IImageWidgetStore _imageWidgetStore;

        public ImageWidgetEngine(
            DatabaseContext context,
            IImageWidgetStore imageWidgetStore
            )
        {
            _context = context;
            _imageWidgetStore = imageWidgetStore;
        }

        public async Task<List<ImageWidgetModel>> GetImageWidgetModels(string userId, int storyBoardId)
        {
            var imageWidgetCores = await _imageWidgetStore.GetImageWidgetCores(storyBoardId);
            var widgetImages = await _imageWidgetStore.GetWidgetImages(imageWidgetCores.Select(x => x.Id));

            return (from iwc in imageWidgetCores
                    join wi in widgetImages
                        on iwc.Id equals wi.ImageWidgetId into grp
                    select new ImageWidgetModel()
                    {
                        Id = iwc.Id,
                        Sort = iwc.Sort,
                        StoryBoardId = storyBoardId,
                        WidgetType = WidgetType.Image,
                        ImageData = grp.Select(x => new ImageData()
                        {
                            Base64ImageData = Convert.ToBase64String(x.ImageData),
                            Sort = x.Sort
                        }).ToList()
                    }).ToList();
        }

      
    }

}
