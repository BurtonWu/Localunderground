using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public class StoryBoardEngineBase
    {
        public static List<StoryBoardCore> SortStoryBoardCores(StoryBoardSort sortOrder, IEnumerable<StoryBoardCore> cores, int sortDirection = 1)
        {
            switch(sortOrder)
            {
                case StoryBoardSort.Title:
                    if (sortDirection == 1)
                        return cores.OrderByDescending(x => x.Title).ToList();
                    else
                        return cores.OrderBy(x => x.Title).ToList();
                default:
                    return cores.ToList();
            }
        }
    }
}
