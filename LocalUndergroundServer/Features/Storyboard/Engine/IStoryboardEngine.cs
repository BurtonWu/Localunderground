using LocalUndergroundServer.Features.Storyboard.Models;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public interface IStoryBoardEngine
    {
        Task<StoryBoardModel> GetStoryBoardViewModel(int id);
        Task<int> CreateStoryBoard(string userId, string title, int categoryId, string synopsis = "", string coverPortrait = null);
        Task<List<StoryBoardStudioCardModel>> GetStoryBoardStudioCards(string userId);
        Task<StoryBoardModel> GetStoryBoardEditModel(int id);
        Task UpdateStoryBoard(int id, string userId, string title, string synopsis, int categoryId);

    }
}
