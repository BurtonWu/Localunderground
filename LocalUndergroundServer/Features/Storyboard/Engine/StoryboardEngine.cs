using LocalUndergroundServer.Data;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Shared.Models;
using LocalUndergroundServer.Features.Storyboard.Models;
using LocalUndergroundServer.Data.DTO.Storyboard;
using LocalUndergroundServer.Features.Storyboard.Constants;

namespace LocalUndergroundServer.Features.Storyboard.Engine
{
    public class StoryboardEngine : StoryboardEngineBase, IStoryboardEngine
    {
        private readonly DatabaseContext _context;
        private readonly IStoryboardStore _storyboardStore;

        public StoryboardEngine(
            DatabaseContext context,
            IStoryboardStore storyboardStore
            )
        {
            _context = context;
            _storyboardStore = storyboardStore;
        }

        public async Task<List<StoryBoardModel>> GetStoryboards(StoryboardSort sortOrder = StoryboardSort.Title, int sortDirection = 1, 
            int currentIndex = 0, int loadCount = 20, string filterText = null)
        {
            var storyboards = await _storyboardStore.GetStoryboards(currentIndex, loadCount, filterText);
            var sortedCores = SortStoryboardCores(sortOrder, storyboards, sortDirection);
            return sortedCores.Select(x => new StoryBoardModel()
            {
                Id = x.Id,
                Title = x.Title,
                Synopsis = x.Synopsis
                //PreviewImages = x.PreviewImages.Select(y => new ImageBase() {
                //    Name = y.Name,
                //    ImageDataBase64 = Convert.ToBase64String(y.ImageData)
                //}).ToList()
            }).ToList();
        }

        public async Task<int> CreateStoryboard(string userId, StoryboardCreateModel model)
        {
            var createDto = new StoryboardCreateDTO()
            {
                UserId = userId,
                Synopsis = model.Synopsis,
                Title = model.Title,
            };

            var storyboardId = await _storyboardStore.CreateStoryboard(createDto);

            //if(model.ByteData.Count == 1)
            //{
            //    var byteData = model.ByteData.First();
            //    await _billboardStore.UploadImage(billboardId, byteData.FileName, byteData.Size, byteData.ByteData);
            //}

            return storyboardId;
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
