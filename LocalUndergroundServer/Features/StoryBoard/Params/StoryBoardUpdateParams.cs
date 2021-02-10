using LocalUndergroundServer.Features.StoryBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Params
{
    public class StoryBoardUpdateParams
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
    }
}
