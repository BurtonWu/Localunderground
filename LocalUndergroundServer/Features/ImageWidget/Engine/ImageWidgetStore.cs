using LocalUndergroundServer.Data.Models.ImageWidget;
using LocalUndergroundServer.Data.Shared;
using LocalUndergroundServer.Features.ImageWidget.DTO;
using LocalUndergroundServer.Features.ImageWidget.Models;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.ImageWidget.Engine
{
    public class ImageWidgetStore : IImageWidgetStore
    {
        private readonly ISqlEngine _sqlEngine;
        private readonly IStoryBoardStore _storyBoardStore;
        private readonly DatabaseContext _dbContext;

        public ImageWidgetStore(
            ISqlEngine sqlEngine,
            IStoryBoardStore storyBoardStore,
            DatabaseContext dbContext
            )
        {
            _sqlEngine = sqlEngine;
            _storyBoardStore = storyBoardStore;
            _dbContext = dbContext;
        }

        public async Task<List<ImageWidgetCoreDTO>> GetImageWidgetCores(int storyBoardId, int? id = null)
        {
            return await _dbContext.ImageWidgetCore.Where(x => x.StoryBoardID == storyBoardId && (!id.HasValue || x.ID == id.Value))
                .Select(x => new ImageWidgetCoreDTO()
                {
                    Id = x.ID,
                    Sort = x.Sort
                }).ToListAsync();
        }

        public async Task<List<WidgetImageDTO>> GetWidgetImages(int imageWidgetId, int? id = null)
        {
            return await _dbContext.WidgetImage.Where(x => x.ImageWidgetID == imageWidgetId && (!id.HasValue || x.ID == id.Value))
                .Select(x => new WidgetImageDTO()
                {
                    Id = x.ID,
                    Sort = x.Sort,
                    ImageData = x.ImageData,
                    ImageWidgetId = imageWidgetId
                }).ToListAsync();
        }

        public async Task<List<WidgetImageDTO>> GetWidgetImages(IEnumerable<int> imageWidgetIds)
        {
            return await _dbContext.WidgetImage.Where(x => imageWidgetIds.Contains(x.ImageWidgetID))
                .Select(x => new WidgetImageDTO()
                {
                    Id = x.ID,
                    Sort = x.Sort,
                    ImageData = x.ImageData,
                    ImageWidgetId = x.ImageWidgetID
                }).ToListAsync();
        }


        public async Task<int?> CreateImageWidget(string userId, int storyBoardId, int sort, IEnumerable<ImageData> imageData)
        {
            var storyBoardExists = await _storyBoardStore.StoryBoardExists(storyBoardId, userId);
            if (!storyBoardExists) return null;

            var widget = new ImageWidgetCore()
            {
                StoryBoardID = storyBoardId,
                Sort = sort
            };
            await _dbContext.ImageWidgetCore.AddAsync(widget);
            await _dbContext.SaveChangesAsync();

            if (imageData.Any())
            {
                await UpdateWidgetImages(widget.ID, imageData.ToList());
                await _dbContext.SaveChangesAsync();
            }
            return widget.ID;
        }


        public async Task<bool> UpdateImageWidget(string userId, int imageWidgetId, int storyBoardId, int sort, IEnumerable<ImageData> imageData)
        {
            var storyBoardExists = await _storyBoardStore.StoryBoardExists(storyBoardId, userId);
            if (!storyBoardExists) return false;

            var widget = await _dbContext.ImageWidgetCore.SingleOrDefaultAsync(x => x.ID == imageWidgetId && x.StoryBoardID == storyBoardId);
            if (widget == null) return false;

            widget.Sort = sort;
            _dbContext.ImageWidgetCore.Update(widget);

            await UpdateWidgetImages(widget.ID, imageData.ToList());
            return await _dbContext.SaveChangesAsync() == 1;
        }

        private async Task UpdateWidgetImages(int imageWidgetId, IList<ImageData> imageData)
        {
            var widgetImagesToDelete = await _dbContext.WidgetImage.Where(x => x.ImageWidgetID == imageWidgetId).ToListAsync();
            if (widgetImagesToDelete.Count > 0)
            {
                _dbContext.RemoveRange(widgetImagesToDelete);
            }
            var widgetImages = imageData.Select(x =>
            {
                var bytes = Convert.FromBase64String(x.Base64ImageData.Split(',')[1]);
                return new WidgetImage()
                {
                    ImageData = bytes,
                    Size = bytes.Length,
                    ImageWidgetID = imageWidgetId,
                    Sort = x.Sort
                };
            }).ToList();
            await _dbContext.WidgetImage.AddRangeAsync(widgetImages);
        }

        public async Task<bool> DeleteImageWidget(string userId, int storyBoardId, int imageWidgetId)
        {
            var storyBoardExists = await _storyBoardStore.StoryBoardExists(storyBoardId, userId);
            if (!storyBoardExists) return false;

            var widget = await _dbContext.ImageWidgetCore.SingleOrDefaultAsync(x => x.ID == imageWidgetId && x.StoryBoardID == storyBoardId);
            if (widget == null) return false;

            var widgetImages = await _dbContext.WidgetImage.Where(x => x.ImageWidgetID == imageWidgetId).ToListAsync();
            
            _dbContext.RemoveRange(widgetImages);
            await _dbContext.SaveChangesAsync();
            _dbContext.Remove(widget);
            return await _dbContext.SaveChangesAsync() == 1;
        }
        //public async Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData)
        //{
        //    //var image = new BillboardImage()
        //    //{
        //    //    BillboardId = billboardId,
        //    //    Name = name,
        //    //    Size = size,
        //    //    ImageData = imageData
        //    //};
        //    //await _dbContext.BillboardImage.AddAsync(image);
        //    //await _dbContext.SaveChangesAsync();
        //    //return image.Id;


        //    return 0;
        //    //var sqlParameters = _sqlEngine.AddSqlParameter("@Title", title);
        //    //_sqlEngine.AddSqlParameter("@BillboardId", billboardId);
        //    //_sqlEngine.AddSqlParameter("@Size", size, sqlParameters);
        //    //_sqlEngine.AddSqlParameter("@ImageData", imageData, sqlParameters);
        //    //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

        //    //var outputParameters = await _sqlEngine.ExecuteStoredProcedure("spUploadBillboardImage", sqlParameters);
        //    //return (int)outputParameters[0].Value;
        //}

        //public async Task<List<PanelImage>> GetImages()
        //{
        //    //var sqlParameters = _sqlEngine.AddSqlParameter("@Name", panelImage.Name);
        //    //_sqlEngine.AddSqlParameter("@Size", panelImage.Size, sqlParameters);
        //    //_sqlEngine.AddSqlParameter("@ImageData", panelImage.ImageData, sqlParameters);
        //    //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

        //    var data = await _sqlEngine.ExecuteStoredProcedure<PanelImageDTO>("spGetPanelImages", null);
        //    return data.Select(x => new PanelImage()
        //    {
        //        ImageData = Convert.ToBase64String(x.ImageData),
        //        Name = x.Name
        //    }).ToList();
        //}
    }
}
