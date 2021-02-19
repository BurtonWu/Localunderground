using LocalUndergroundServer.Features.BillBoard.Models;
using LocalUndergroundServer.Features.Classification.Constants;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.BillBoard.Engine
{
    public interface IBillBoardEngine
    {
        public Task<List<PostCardModel>> GetPostCards(StoryBoardSort sortOrder = StoryBoardSort.Title, int sortDirection = 1,
                 int currentIndex = 0, int loadCount = 20, string filterText = null, CategoryId categoryId = CategoryId.All);

    }
}
