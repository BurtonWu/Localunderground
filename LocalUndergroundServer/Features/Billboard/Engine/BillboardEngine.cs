using LocalUndergroundServer.Data;
using LocalUndergroundServer.Data.DTO.Billboard;
using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Features.Billboard.Constants;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Shared.Models;

namespace LocalUndergroundServer.Features.Billboard.Engine
{
    public class BillboardEngine : BillboardEngineBase, IBillboardEngine
    {
        private readonly DatabaseContext _context;
        private readonly IBillboardStore _billboardStore;

        public BillboardEngine(
            DatabaseContext context,
            IBillboardStore billboardStore
            )
        {
            _context = context;
            _billboardStore = billboardStore;
        }

        public async Task<List<BillboardPreviewModel>> GetBillboards(BillboardSort sortOrder = BillboardSort.Date, int sortDirection = 1, 
            int currentIndex = 0, int loadCount = 20, string filterText = null)
        {
            var billboards = await _billboardStore.GetBillboards(currentIndex, loadCount, filterText);
            var sortedCores = SortBillboardCores(sortOrder, billboards, sortDirection);
            return sortedCores.Select(x => new BillboardPreviewModel()
            {
                Id = x.Id,
                Title = x.Title,
                CategoryId = x.CategoryId,
                Price = x.Price,
                //PreviewImages = x.PreviewImages.Select(y => new ImageBase() {
                //    Name = y.Name,
                //    ImageDataBase64 = Convert.ToBase64String(y.ImageData)
                //}).ToList()
            }).ToList();
        }

        public async Task<int> CreateBillboard(string userId, BillboardCreateModel model)
        {
            var createDto = new BillboardCreateDTO()
            {
                UserId = userId,
                Description = model.Description,
                Title = model.Title,
                CategoryId = model.CategoryId,
                CategoryName = model.CategoryName,
                Price = model.Price
            };

            var billboardId = await _billboardStore.CreateBillboard(createDto);

            if(model.ByteData.Count == 1)
            {
                var byteData = model.ByteData.First();
                await _billboardStore.UploadImage(billboardId, byteData.FileName, byteData.Size, byteData.ByteData);
            }

            return billboardId;
        }
    
        //public async Task<bool> UpdateBillboard(int id, string description, string userId)
        //{
        //    var billboard = await _context.BillboardCore.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        //    if(billboard == null) return false;

        //    billboard.Description = description;
        //    await _context.SaveChangesAsync();
        //    return true;
        //}

        //public async Task<bool> DeleteBillboard(int id, string userId)
        //{
        //    var billboard = await _context.BillboardCore.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        //    if (billboard == null) return false;

        //    _context.BillboardCore.Remove(billboard);
        //    await _context.SaveChangesAsync();
        //    return true;
        //}
    }

}
