using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.Widget.Constants;
using LocalUndergroundServer.Features.Widget.Models;
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
    public class WidgetStore : IWidgetStore
    {
        private readonly ISqlEngine _sqlEngine;
        private readonly DatabaseContext _dbContext;

        public WidgetStore(
            ISqlEngine sqlEngine,
            DatabaseContext dbContext
            )
        {
            _sqlEngine = sqlEngine;
            _dbContext = dbContext;
        }

        public async Task<int> SortWidgets(IEnumerable<WidgetSortModel> widgetSorts)
        {
            foreach (var widgetSort in widgetSorts)
            {
                switch (widgetSort.WidgetType)
                {
                    case WidgetType.Text:
                        var textWidget = await _dbContext.TextWidgetCore.SingleOrDefaultAsync(x => x.Id == widgetSort.Id);
                        if (textWidget == null) continue;

                        textWidget.Sort = widgetSort.Sort;
                        _dbContext.Update(textWidget);
                        break;
                }
            }
            return await _dbContext.SaveChangesAsync();
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
