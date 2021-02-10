using LocalUndergroundServer.Features.ImageWidget.Models;
using LocalUndergroundServer.Features.TextWidget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Models
{
    public class StoryBoardModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public string CoverPortrait { get; set; }
        public List<TextWidgetModel> TextWidgetModels { get; set; }
        public List<ImageWidgetModel> ImageWidgetModels { get; set; }
    }
}
