using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.DTO.StoryBoard
{
    public class StoryBoardCreateDTO
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
    }
}
