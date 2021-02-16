using LocalUndergroundServer.Features.Widget.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.TextWidget
{
    public class TextWidgetCore : IWidget
    {
        public int ID { get; set; }
        public int StoryBoardID { get; set; }
        public int Sort { get; set; }
        public string Body { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
