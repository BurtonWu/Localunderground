using LocalUndergroundServer.Features.Widget.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.ImageWidget
{
    public class ImageWidgetCore : IWidget
    {
        public int ID { get; set; }
        public int StoryBoardID { get; set; }
        public int Sort { get; set; }
    }
}
