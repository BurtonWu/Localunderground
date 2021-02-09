using LocalUndergroundServer.Features.TextWidget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.BillBoard.Models
{
    public class PostCardModel
    {
        public int StoryBoardId { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
    }
}
