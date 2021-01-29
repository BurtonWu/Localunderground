using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Models.Params;
using LocalUndergroundServer.Features.TextWidget.Engine;
using LocalUndergroundServer.Features.TextWidget.Params;
using LocalUndergroundServer.Features.Widget.Constants;
using LocalUndergroundServer.Features.Widget.Params;
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
    public class WidgetController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IWidgetEngine _widgetEngine;
        private readonly DatabaseContext _context;

        public WidgetController(
            UserManager<User> userManager,
            IWidgetEngine widgetEngine,
            DatabaseContext context)

        {
            _userManager = userManager;
            _widgetEngine = widgetEngine;
            _context = context;
        }

        [Authorize]
        [HttpPut]
        [Route(Routes.Widget.Sort)]
        public async Task<ActionResult> SortWidgets([FromBody] WidgetSortParams model)
        {
            var updatedSort = await _widgetEngine.SortWidgets(model.StoryBoardId, model.WidgetSortModels);
            return Ok(updatedSort);
        }

        [Authorize]
        [HttpPut]
        [Route(Routes.Widget.Delete)]
        public async Task<ActionResult> DeleteWidget([FromBody] WidgetDeleteParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            var isDeleted = await _widgetEngine.DeleteWidget(userId, model.WidgetId, model.StoryBoardId, (WidgetType)model.WidgetType);
            return Ok(isDeleted);
        }


    }
}
