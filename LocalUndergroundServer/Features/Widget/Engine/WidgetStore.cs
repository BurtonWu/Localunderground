using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.Widget.Constants;
using LocalUndergroundServer.Features.Widget.Interfaces;
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

        public async Task<int> SortWidgets(int storyBoardId, IEnumerable<WidgetSortModel> widgetSorts)
        {
            //update to use sql proc
            return 1;
            //var widgetSortDic = widgetSorts.GroupBy(x => x.WidgetType).ToDictionary(x => x.Key, x => x);

            //Func<IWidget, WidgetSortModel, IWidget> replaceSort = (IWidget widget, WidgetSortModel sortModel) =>
            //{
            //    widget.Sort = sortModel.Sort;
            //    return widget;
            //};

            //foreach (var widgetSort in widgetSortDic)
            //{
            //    List<IWidget> updatedCores = new List<IWidget>();
            //    switch (widgetSort.Key)
            //    {
            //        case WidgetType.Text:
            //            updatedCores = (from twc in _dbContext.TextWidgetCore
            //                            join ws in widgetSort.Value
            //                                on new { widgetId = twc.ID, storyBoardId = twc.StoryBoardID } equals new { widgetId = ws.Id, storyBoardId = storyBoardId } into grp
            //                            select replaceSort(twc, ws)).ToList();


            //            _dbContext.UpdateRange(updatedCores);
            //            break;
            //        //TODO: update internal image sort as well
            //        case WidgetType.Image:
            //            updatedCores = (from iwc in _dbContext.ImageWidgetCore
            //                            join ws in widgetSort.Value
            //                                on new { widgetId = iwc.ID, storyBoardId = iwc.StoryBoardID } equals new { widgetId = ws.Id, storyBoardId = storyBoardId } into grp
            //                            select replaceSort(iwc, ws)).ToList();
            //            _dbContext.UpdateRange(updatedCores);
            //            break;
            //    }
            //}
            //return await _dbContext.SaveChangesAsync();
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
