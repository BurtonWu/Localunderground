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

        public async Task<List<ImageWidgetModel>> GetImageWidgetModels(int storyBoardId)
        {
            var cores = await _textWidgetStore.GetImageWidgetCores(storyBoardId);
            if (cores.Count > 0)
            {
                return cores.Select(x => new ImageWidgetModel()
                {
                    Id = x.Id,
                    Body = x.Body,
                    Sort = x.Sort,
                    StoryBoardId = storyBoardId
                }).OrderBy(x => x.Sort).ToList();
            }
            return new List<ImageWidgetModel>();
        }

      
    }

}
