using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Data.Models.Storyboard;
using LocalUndergroundServer.Features.Billboard.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Storyboard.Engine
{
    public class StoryboardEngineBase
    {
        public static List<StoryboardCore> SortStoryboardCores(StoryboardSort sortOrder, IEnumerable<StoryboardCore> cores, int sortDirection = 1)
        {
            switch(sortOrder)
            {
                case StoryboardSort.Title:
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
