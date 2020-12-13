//using LocalUndergroundServer.Data.DTO.Billboard;
//using LocalUndergroundServer.Data.Models.Billboard;
//using LocalUndergroundServer.Infrastructure.DataAccess;
//using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;
//using System.Threading.Tasks;

//namespace LocalUndergroundServer.Features.Billboard.Engine
//{
//    public class BillboardStore : IBillboardStore
//    {
//        private readonly ISqlEngine _sqlEngine;
//        private readonly DatabaseContext _dbContext;

//        public BillboardStore(
//            ISqlEngine sqlEngine,
//            DatabaseContext dbContext
//            )
//        {
//            _sqlEngine = sqlEngine;
//            _dbContext = dbContext;
//        }

//        public async Task<List<BillboardCore>> GetBillboards(int currentIndex, int loadCount = 20, string filterText = null)
//        {
//            return await _dbContext.BillboardCore
//                .Skip(currentIndex)
//                .Take(loadCount)
//                .Where(x => x.Title == filterText || string.IsNullOrWhiteSpace(filterText))
//                .ToListAsync();
//        }

//        public async Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData)
//        {
//            var image = new BillboardImage()
//            {
//                BillboardId = billboardId,
//                Name = name,
//                Size = size,
//                ImageData = imageData
//            };
//            await _dbContext.BillboardImage.AddAsync(image);
//            await _dbContext.SaveChangesAsync();
//            return image.Id;
//            //var sqlParameters = _sqlEngine.AddSqlParameter("@Title", title);
//            //_sqlEngine.AddSqlParameter("@BillboardId", billboardId);
//            //_sqlEngine.AddSqlParameter("@Size", size, sqlParameters);
//            //_sqlEngine.AddSqlParameter("@ImageData", imageData, sqlParameters);
//            //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

//            //var outputParameters = await _sqlEngine.ExecuteStoredProcedure("spUploadBillboardImage", sqlParameters);
//            //return (int)outputParameters[0].Value;
//        }

//        public async Task<int> CreateBillboard(BillboardCreateDTO model)
//        {
//            var core = new BillboardCore()
//            {
//                CategoryId = model.CategoryId,
//                CategoryName = model.CategoryName,
//                Price = model.Price,
//                CreatedDate = DateTime.UtcNow,
//                Description = model.Description,
//                Title = model.Title,
//                UserId = model.UserId
//            };
//            await _dbContext.BillboardCore.AddAsync(core);
//            await _dbContext.SaveChangesAsync();
//            return core.Id;
//        }

//        //public async Task<List<PanelImage>> GetImages()
//        //{
//        //    //var sqlParameters = _sqlEngine.AddSqlParameter("@Name", panelImage.Name);
//        //    //_sqlEngine.AddSqlParameter("@Size", panelImage.Size, sqlParameters);
//        //    //_sqlEngine.AddSqlParameter("@ImageData", panelImage.ImageData, sqlParameters);
//        //    //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

//        //    var data = await _sqlEngine.ExecuteStoredProcedure<PanelImageDTO>("spGetPanelImages", null);
//        //    return data.Select(x => new PanelImage()
//        //    {
//        //        ImageData = Convert.ToBase64String(x.ImageData),
//        //        Name = x.Name
//        //    }).ToList();
//        //}
//    }
//}
