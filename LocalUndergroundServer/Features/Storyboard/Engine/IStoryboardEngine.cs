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
        Task<int> CreateStoryBoard(string userId, string title, string synopsis = "", string coverPortrait = null);
        
        //Task<BillboardDetailServiceModel> GetBillboardDetails(int id);
        //Task<bool> UpdateBillboard(int id, string description, string userId);
        //Task<bool> DeleteBillboard(int id, string userId);

    }
}
