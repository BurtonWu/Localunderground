﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Models.Params
{
    public class StoryBoardGetParams
    {
        public int SortOrder { get; set; }
        public int SortDirection { get; set; }
        public int CurrentIndex { get; set; }
        public int LoadCount { get; set; }
        public string FilterText { get; set; }
    }
}
