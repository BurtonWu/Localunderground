﻿using LocalUndergroundServer.Data.Models.TextWidget;
using LocalUndergroundServer.Features.TextWidget.DTO;
using LocalUndergroundServer.Features.TextWidget.Models;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public class TextWidgetStore : ITextWidgetStore
    {
        private readonly ISqlEngine _sqlEngine;
        private readonly DatabaseContext _dbContext;

        public TextWidgetStore(
            ISqlEngine sqlEngine,
            DatabaseContext dbContext
            )
        {
            _sqlEngine = sqlEngine;
            _dbContext = dbContext;
        }

        public async Task<List<TextWidgetCoreDTO>> GetTextWidgetCores(int storyBoardId)
        {
            var cores = await _dbContext.TextWidgetCore.Where(x => x.StoryBoardID == storyBoardId).ToListAsync();
            if(cores.Count > 0)
            {
                return cores.Select(x => new TextWidgetCoreDTO()
                {
                    Id = x.ID,
                    Body = x.Body,
                    Sort = x.Sort
                }).OrderBy(x => x.Sort).ToList();
            }
            return new List<TextWidgetCoreDTO>();
        }

        public async Task<int?> CreateTextWidget(int storyBoardId, int sort, string body = "")
        {
            var storyBoardCore = await _dbContext.StoryBoardCore.SingleOrDefaultAsync(x => x.ID == storyBoardId);
            if (storyBoardCore == null) return null;

            var widget = new TextWidgetCore()
            {
                StoryBoardID = storyBoardId,
                Sort = sort,
                Body = body,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow
            };
            await _dbContext.TextWidgetCore.AddAsync(widget);
            await _dbContext.SaveChangesAsync();
            return widget.ID;
        }

        public async Task<bool> UpdateTextWidget(int textWidgetId, int storyBoardId, int sort, string body = "")
        {
            var widget = await _dbContext.TextWidgetCore.SingleOrDefaultAsync(x => x.ID == textWidgetId && x.StoryBoardID == storyBoardId);
            if (widget == null) return false;

            widget.Sort = sort;
            widget.Body = body;
            _dbContext.TextWidgetCore.Update(widget);

            return await _dbContext.SaveChangesAsync() == 1;
        }

        public async Task<bool> DeleteTextWidget(string userId, int storyBoardId, int textWidgetId)
        {
            var storyBoardCore = await _dbContext.StoryBoardCore.SingleOrDefaultAsync(x => x.ID == storyBoardId && x.UserID ==  userId);

            var widget = await _dbContext.TextWidgetCore.SingleOrDefaultAsync(x => x.ID == textWidgetId && x.StoryBoardID == storyBoardId);
            if (storyBoardCore == null || widget == null) return false;

            _dbContext.Remove(widget);
            return await _dbContext.SaveChangesAsync() == 1;
        }

        public async Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData)
        {
            //var image = new BillboardImage()
            //{
            //    BillboardId = billboardId,
            //    Name = name,
            //    Size = size,
            //    ImageData = imageData
            //};
            //await _dbContext.BillboardImage.AddAsync(image);
            //await _dbContext.SaveChangesAsync();
            //return image.Id;


            return 0;
            //var sqlParameters = _sqlEngine.AddSqlParameter("@Title", title);
            //_sqlEngine.AddSqlParameter("@BillboardId", billboardId);
            //_sqlEngine.AddSqlParameter("@Size", size, sqlParameters);
            //_sqlEngine.AddSqlParameter("@ImageData", imageData, sqlParameters);
            //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

            //var outputParameters = await _sqlEngine.ExecuteStoredProcedure("spUploadBillboardImage", sqlParameters);
            //return (int)outputParameters[0].Value;
        }

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
