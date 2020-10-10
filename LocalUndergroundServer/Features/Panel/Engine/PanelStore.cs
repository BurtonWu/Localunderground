using LocalUndergroundServer.Data.DTO.Panel;
using LocalUndergroundServer.Features.Panel.Models;
using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel.Engine
{
    public class PanelStore : IPanelStore
    {
        private readonly ISqlEngine _sqlEngine;

        public PanelStore(ISqlEngine sqlEngine)
        {
            _sqlEngine = sqlEngine;
        }

        public async Task<int> UploadImage(PanelImageDTO panelImage)
        {
            var sqlParameters = _sqlEngine.AddSqlParameter("@Name", panelImage.Name);
            _sqlEngine.AddSqlParameter("@Size", panelImage.Size, sqlParameters);
            _sqlEngine.AddSqlParameter("@ImageData", panelImage.ImageData, sqlParameters);
            _sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

            var outputParameters = await _sqlEngine.ExecuteStoredProcedure("spUploadPanelImage", sqlParameters);
            return (int)outputParameters[0].Value;
        }

        public async Task<List<PanelImage>> GetImages()
        {
            //var sqlParameters = _sqlEngine.AddSqlParameter("@Name", panelImage.Name);
            //_sqlEngine.AddSqlParameter("@Size", panelImage.Size, sqlParameters);
            //_sqlEngine.AddSqlParameter("@ImageData", panelImage.ImageData, sqlParameters);
            //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

            var data = await _sqlEngine.ExecuteStoredProcedure<PanelImageDTO>("spGetPanelImages", null);
            return data.Select(x => new PanelImage()
            {
                ImageData = Convert.ToBase64String(x.ImageData),
                Name = x.Name
            }).ToList();
        }
    }
}
