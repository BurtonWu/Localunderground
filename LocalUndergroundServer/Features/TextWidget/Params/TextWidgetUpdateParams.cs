﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget.Params
{
    public class TextWidgetUpdateParams : TextWidgetCreateParams
    {
        public int Id { get; set; }
        public string Body { get; set; }
    }
}
