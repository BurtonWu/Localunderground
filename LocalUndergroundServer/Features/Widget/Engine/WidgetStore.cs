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

        public async Task SortWidgets(int storyBoardId, IEnumerable<WidgetSortModel> widgetSorts)
        {
            var sqlParameters = _sqlEngine.AddSqlParameter("@StoryBoardID", storyBoardId);
            if(widgetSorts.Any())
            {
                var dataTable = new DataTable("TVP_WidgetSort");
                dataTable.Columns.Add("ID", typeof(int));
                dataTable.Columns.Add("Sort", typeof(int));
                dataTable.Columns.Add("WidgetType", typeof(int));

                foreach (var sort in widgetSorts)
                {
                    dataTable.Rows.Add(sort.Id, sort.Sort, sort.WidgetType);
                }
                _sqlEngine.AddSqlParameter("@WidgetSorts", dataTable, sqlParameters);
            }

            await _sqlEngine.ExecuteStoredProcedure("spUpdateWidgetSort", sqlParameters);
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
