using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.DTO
{
    public class StoryBoardDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public string CoverPortrait { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModifiedOn { get; set; }

    }
}
