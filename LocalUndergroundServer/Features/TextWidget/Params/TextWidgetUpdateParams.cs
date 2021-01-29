using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Params
{
    public class TextWidgetUpdateParams
    {
        public int Id { get; set; }
        public int Sort { get; set; }
        public string Body { get; set; }
        public int StoryBoardId { get; set; }
    }
}
