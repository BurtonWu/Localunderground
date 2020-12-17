using LocalUndergroundServer.Features.Billboard.Constants;
using LocalUndergroundServer.Features.Billboard.Models;
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
        Task<int> CreateStoryBoard(string userId, string title, string synopsis = "");
        Task<List<StoryBoardModel>> GetStoryBoards(StoryBoardSort sortOrder = StoryBoardSort.Title, int sortDirection = 1,
            int currentIndex = 0, int loadCount = 20, string filterText = null);
        //Task<BillboardDetailServiceModel> GetBillboardDetails(int id);
        //Task<bool> UpdateBillboard(int id, string description, string userId);
        //Task<bool> DeleteBillboard(int id, string userId);

    }
}
