using LocalUndergroundServer.Data;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Shared.Models;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public class StoryBoardEngine : StoryBoardEngineBase, IStoryBoardEngine
    {
        private readonly DatabaseContext _context;
        private readonly IStoryBoardStore _storyboardStore;

        public StoryBoardEngine(
            DatabaseContext context,
            IStoryBoardStore storyboardStore
            )
        {
            _context = context;
            _storyboardStore = storyboardStore;
        }

        public async Task<List<StoryBoardModel>> GetStoryBoards(StoryBoardSort sortOrder = StoryBoardSort.Title, int sortDirection = 1, 
            int currentIndex = 0, int loadCount = 20, string filterText = null)
        {
            var storyboards = await _storyboardStore.GetStoryBoards(currentIndex, loadCount, filterText);
            var sortedCores = SortStoryBoardCores(sortOrder, storyboards, sortDirection);
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

        public async Task<int> CreateStoryBoard(string userId, string title, string synopsis = "")
        {
            var createDto = new StoryBoardCreateDTO()
            {
                UserId = userId,
                Synopsis = synopsis,
                Title = title,
            };

            var storyboardId = await _storyboardStore.CreateStoryBoard(createDto);

            //if(model.ByteData.Count == 1)
            //{
            //    var byteData = model.ByteData.First();
            //    await _billboardStore.UploadImage(billboardId, byteData.FileName, byteData.Size, byteData.ByteData);
            //}

            return storyboardId;
        }

        public async Task<int> UpdateStoryBoard(string userId, StoryBoardModel model)
        {
            //update storyboard

            //add or udpate widget

            //add mapping table


            var createDto = new StoryBoardCreateDTO()
            {
                UserId = userId,
                Synopsis = model.Synopsis,
                Title = model.Title,
            };

            var storyboardId = await _storyboardStore.CreateStoryBoard(createDto);

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
