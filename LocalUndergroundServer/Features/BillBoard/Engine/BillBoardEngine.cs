using LocalUndergroundServer.Data;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Shared.Models;
using LocalUndergroundServer.Features.BillBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Data.Models.StoryBoard;

namespace LocalUndergroundServer.Features.BillBoard.Engine
{
    public class BillBoardEngine : IBillBoardEngine
    {
        private readonly DatabaseContext _context;
        private readonly IStoryBoardStore _storyboardStore;

        public BillBoardEngine(
            DatabaseContext context,
            IStoryBoardStore storyboardStore
        )
        {
            _context = context;
            _storyboardStore = storyboardStore;
        }

        public async Task<List<PostCardModel>> GetPostCards(StoryBoardSort sortOrder = StoryBoardSort.Title, int sortDirection = 1, 
            int currentIndex = 0, int loadCount = 20, string filterText = null, int? categoryId = null)
        {
            var storyboards = await _storyboardStore.GetStoryBoards(currentIndex, loadCount, filterText, categoryId);
            var postCards = storyboards.Select(x => new PostCardModel()
            {
                StoryBoardId = x.Id,
                Title = x.Title,
                Synopsis = x.Synopsis,
                CoverPortrait = x.CoverPortrait,
                CreatedDate = x.CreatedOn,
                LastModifiedDate = x.LastModifiedOn
            }).ToList();
            return SortPostCardModels(sortOrder, postCards, sortDirection);
        }

        private List<PostCardModel> SortPostCardModels(StoryBoardSort sortOrder, IEnumerable<PostCardModel> models, int sortDirection = 1)
        {
            switch (sortOrder)
            {
                case StoryBoardSort.Title:
                    if (sortDirection == 1)
                        return models.OrderByDescending(x => x.Title).ToList();
                    else
                        return models.OrderBy(x => x.Title).ToList();
                default:
                    return models.ToList();
            }
        }

    }

}
