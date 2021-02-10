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
using LocalUndergroundServer.Features.ImageWidget.Engine;
using LocalUndergroundServer.Features.TextWidget.Engine;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public class StoryBoardEngine : StoryBoardEngineBase, IStoryBoardEngine
    {
        private readonly DatabaseContext _context;
        private readonly IStoryBoardStore _storyboardStore;
        private readonly IImageWidgetEngine _imageWidgetEngine;
        private readonly ITextWidgetEngine _textWidgetEngine;


        public StoryBoardEngine(
            DatabaseContext context,
            IStoryBoardStore storyboardStore
            )
        {
            _context = context;
            _storyboardStore = storyboardStore;
        }

        public async Task<StoryBoardModel> GetStoryBoardViewModel(int id)
        {
            var storyBoardCore = await _storyboardStore.GetStoryBoard(id);
            var textWidgets = await _textWidgetEngine.GetTextWidgetModels(id);
            var imageWidgets = await _imageWidgetEngine.GetImageWidgetModels(id);

            var model = new StoryBoardModel()
            {
                Id = id,
                ImageWidgetModels = imageWidgets,
                TextWidgetModels = textWidgets,
                Synopsis = storyBoardCore.Synopsis,
                Title = storyBoardCore.Title,
                CoverPortrait = storyBoardCore.CoverPortrait
            };

            return model;
        }

        public async Task<int> CreateStoryBoard(string userId, string title, string synopsis = "", string coverPortrait = null)
        {
            var createDto = new StoryBoardCreateDTO()
            {
                UserId = userId,
                Synopsis = synopsis,
                Title = title,
                CoverPortrait = string.IsNullOrWhiteSpace(coverPortrait) ? null : Convert.FromBase64String(coverPortrait.Split(',')[1])
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
