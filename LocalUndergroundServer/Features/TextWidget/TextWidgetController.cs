using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Models.Params;
using LocalUndergroundServer.Features.TextWidget.Engine;
using LocalUndergroundServer.Features.TextWidget.Params;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.Extensions.Startup;
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
    public class TextWidgetController : ControllerBase
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
        [HttpPost]
        [Route(Routes.TextWidget.BaseTextWidget)]
        public async Task<ActionResult> AddTextWidget([FromBody] TextWidgetAddParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            //put in better place
            //model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var id = await _textWidgetStore.AddTextWidget(model.StoryBoardId, model.Sort);
            return Created("Created", id);
            //return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route(Routes.TextWidget.BaseTextWidget)]
        public async Task<ActionResult> UpdateTextWidget([FromBody] TextWidgetUpdateParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            var isUpdated = await _textWidgetStore.UpdateTextWidget(model.Id, model.StoryBoardId, model.Sort, model.Body);
            return Ok(isUpdated);
        }
    }
}
