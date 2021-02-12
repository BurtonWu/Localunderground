using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Models.Params;
using LocalUndergroundServer.Features.TextWidget.Engine;
using LocalUndergroundServer.Features.TextWidget.Models;
using LocalUndergroundServer.Features.TextWidget.Params;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.Extensions.Startup;
using LocalUndergroundServer.Infrastructure.Request;
using LocalUndergroundServer.Shared.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.TextWidget
{
    [ApiController]
    public class TextWidgetController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly ITextWidgetEngine _textWidgetEngine;
        private readonly ITextWidgetStore _textWidgetStore;

        private readonly DatabaseContext _context;

        public TextWidgetController(
            UserManager<User> userManager,
            ITextWidgetEngine textWidgetEngine,
            ITextWidgetStore textWidgetStore,
            DatabaseContext context)

        {
            _userManager = userManager;
            _textWidgetEngine = textWidgetEngine;
            _textWidgetStore = textWidgetStore;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.TextWidget.Base)]
        public async Task<ActionResult> GetTextWidgets([FromQuery] int storyBoardId)
        {
            var widgets = await _textWidgetEngine.GetTextWidgetModels(storyBoardId);
            return Ok(widgets);
        }


        [Authorize]
        [HttpPost]
        [Route(Routes.TextWidget.Base)]
        public async Task<ActionResult> CreateTextWidget([FromBody] TextWidgetCreateParams model)
        {
            var id = await _textWidgetStore.CreateTextWidget(model.StoryBoardId, model.Sort, model.Body);
            return Created("Created", id);
        }

        [Authorize]
        [HttpPut]
        [Route(Routes.TextWidget.Base)]
        public async Task<ActionResult> UpdateTextWidget([FromBody] TextWidgetUpdateParams model)
        {
            var isUpdated = await _textWidgetStore.UpdateTextWidget(model.Id, model.StoryBoardId, model.Sort, model.Body);
            return Ok(isUpdated);
        }
        
    }
}
