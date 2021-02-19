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
using LocalUndergroundServer.Features.Storyboard.Models;
using LocalUndergroundServer.Features.Classification.Engine;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public class StoryBoardEngine : StoryBoardEngineBase, IStoryBoardEngine
    {
        private readonly DatabaseContext _context;
        private readonly IStoryBoardStore _storyboardStore;
        private readonly IClassificationStore _classificationStore;
        private readonly IImageWidgetEngine _imageWidgetEngine;
        private readonly ITextWidgetEngine _textWidgetEngine;



        public StoryBoardEngine(
            DatabaseContext context,
            IStoryBoardStore storyboardStore,
            ITextWidgetEngine textWidgetEngine,
            IClassificationStore classificationStore,
            IImageWidgetEngine imageWidgetEngine
            )
        {
            _context = context;
            _storyboardStore = storyboardStore;
            _textWidgetEngine = textWidgetEngine;
            _imageWidgetEngine = imageWidgetEngine;
            _classificationStore = classificationStore;
        }

        public async Task<List<StoryBoardStudioCardModel>> GetStoryBoardStudioCards(string userId)
        {
            var cores = await _storyboardStore.GetStoryBoards(userId);
            return cores.Select(x => new StoryBoardStudioCardModel()
            {
                Id = x.Id,
                CoverPortrait = x.CoverPortrait,
                Synopsis = x.Synopsis,
                Title = x.Title
            }).ToList();
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

        public async Task<StoryBoardModel> GetStoryBoardEditModel(int id)
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
                CategoryId = storyBoardCore.CategoryId,
                CoverPortrait = storyBoardCore.CoverPortrait
            };

            return model;
        }

        public async Task<int> CreateStoryBoard(string userId, string title, int categoryId, string synopsis = "", string coverPortrait = null)
        {
            var categories = await _classificationStore.GetCategories();
            var category = categories.SingleOrDefault(x => x.CategoryId == categoryId);
            if (category == null)
            {
                throw new ApplicationException("Invalid category.");
            }

            var createDto = new StoryBoardCreateDTO()
            {
                UserId = userId,
                Synopsis = synopsis,
                Title = title,
                CategoryId = categoryId,
                CoverPortrait = string.IsNullOrWhiteSpace(coverPortrait) ? null : Convert.FromBase64String(coverPortrait.Split(',')[1])
            };

            var storyboardId = await _storyboardStore.CreateStoryBoard(createDto);
            return storyboardId;
        }

        public async Task UpdateStoryBoard(int id, string userId, string title, string synopsis, int categoryId)
        {
            var storyBoardExist = await _storyboardStore.StoryBoardExists(id, userId);
            if(!storyBoardExist)
            {
                throw new ApplicationException("Invalid StoryBoard.");
            }
            var categories = await _classificationStore.GetCategories();
            var category = categories.SingleOrDefault(x => x.CategoryId == categoryId);
            if(category == null)
            {
                throw new ApplicationException("Invalid category.");
            }
            await _storyboardStore.UpdateStoryBoard(id, userId, title, synopsis, categoryId);
        }

        public async Task DeleteStoryBoard(int id, string userId)
        {
            var storyBoardExist = await _storyboardStore.StoryBoardExists(id, userId);
            if (!storyBoardExist)
            {
                throw new ApplicationException("Invalid StoryBoard.");
            }
            await _storyboardStore.DeleteStoryBoard(id);
        }
    }

}
