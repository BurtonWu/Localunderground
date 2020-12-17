using LocalUndergroundServer.Data.Models.TextWidget;
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

        public async Task<int?> AddTextWidget(int storyBoardId, int sort, string body = "")
        {
            var storyBoardCore = await _dbContext.StoryBoardCore.SingleOrDefaultAsync(x => x.Id == storyBoardId);
            if (storyBoardCore == null) return null;

            var widget = new TextWidgetCore()
            {
                StoryBoardId = storyBoardId,
                Sort = sort,
                Body = body
            };
            await _dbContext.TextWidgetCore.AddAsync(widget);

            return widget.Id;
        }

        public async Task<bool> UpdateTextWidget(int textWidgetId, int storyBoardId, int sort, string body = "")
        {
            var widget = await _dbContext.TextWidgetCore.SingleOrDefaultAsync(x => x.Id == textWidgetId && x.StoryBoardId == storyBoardId);
            if (widget == null) return false;

            widget.Sort = sort;
            widget.Body = body;
            _dbContext.TextWidgetCore.Update(widget);

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
