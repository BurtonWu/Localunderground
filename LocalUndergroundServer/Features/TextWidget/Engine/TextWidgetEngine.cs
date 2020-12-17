using LocalUndergroundServer.Data;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalUndergroundServer.Shared.Models;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;

namespace LocalUndergroundServer.Features.TextWidget.Engine
{
    public class TextWidgetEngine : ITextWidgetEngine
    {
        private readonly DatabaseContext _context;
        private readonly ITextWidgetStore _textWidgetStore;

        public TextWidgetEngine(
            DatabaseContext context,
            ITextWidgetStore textWidgetStore
            )
        {
            _context = context;
            _textWidgetStore = textWidgetStore;
        }

        
    }

}
