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
using LocalUndergroundServer.Features.TextWidget.Models;

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

        public async Task<List<TextWidgetModel>> GetTextWidgetModels(int storyBoardId)
        {
            var cores = await _textWidgetStore.GetTextWidgetCores(storyBoardId);
            if (cores.Count > 0)
            {
                return cores.Select(x => new TextWidgetModel()
                {
                    Id = x.Id,
                    Body = x.Body,
                    Sort = x.Sort,
                    StoryBoardId = storyBoardId
                }).OrderBy(x => x.Sort).ToList();
            }
            return new List<TextWidgetModel>();
        }

      
    }

}
