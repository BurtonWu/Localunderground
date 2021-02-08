using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Widget.Interfaces
{
    public interface IWidget
    {
        public int StoryBoardID { get; set; }
        public int Sort { get; set; }

    }
}
