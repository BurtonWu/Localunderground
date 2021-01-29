using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.ImageWidget.Models
{
    public class ImageWidgetModel
    {
        public int Id { get; set; }
        public int Sort { get; set; }
        public List<ImageData> ImageData { get; set; }
        public int StoryBoardId { get; set; }
    }
}
