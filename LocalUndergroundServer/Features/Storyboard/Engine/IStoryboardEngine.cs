using LocalUndergroundServer.Features.Billboard.Constants;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Features.Storyboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Storyboard.Engine
{
    public interface IStoryboardEngine
    {
        Task<int> CreateStoryboard(string userId, StoryboardCreateModel model);
        Task<List<StoryBoardModel>> GetStoryboards(StoryboardSort sortOrder = StoryboardSort.Title, int sortDirection = 1,
            int currentIndex = 0, int loadCount = 20, string filterText = null);
        //Task<BillboardDetailServiceModel> GetBillboardDetails(int id);
        //Task<bool> UpdateBillboard(int id, string description, string userId);
        //Task<bool> DeleteBillboard(int id, string userId);

    }
}
