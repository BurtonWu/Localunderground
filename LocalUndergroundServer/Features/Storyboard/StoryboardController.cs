using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Billboard.Constants;
using LocalUndergroundServer.Features.Billboard.Engine;
using LocalUndergroundServer.Features.Storyboard.Engine;
using LocalUndergroundServer.Features.Storyboard.Models;
using LocalUndergroundServer.Features.Storyboard.Models.Params;
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

namespace LocalUndergroundServer.Features.Storyboard
{
    [ApiController]
    public class StoryboardController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IStoryboardEngine _storyboardEngine;
        private readonly DatabaseContext _context;

        public StoryboardController(
            UserManager<User> userManager,
            IStoryboardEngine storyboardEngine,
            DatabaseContext context)

        {
            _userManager = userManager;
            _storyboardEngine = storyboardEngine;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.Storyboard.BaseStoryboard)]
        public async Task<ActionResult<List<StoryBoardModel>>> GetStoryboards([FromQuery] StoryboardGetParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            var billboards = await _storyboardEngine.GetStoryboards((StoryboardSort)model.SortOrder, model.SortDirection,
                model.CurrentIndex, model.LoadCount, model.FilterText);
            return Ok(billboards);
        }

        //[Authorize]
        //[HttpPost]
        //[Route(Routes.Storyboard.BaseStoryboard)]
        //public async Task<ActionResult> Create([FromForm] StoryboardCreateModel model)
        //{
        //    var userId = User.GetClaim(ClaimTypes.NameIdentifier);
        //    //put in better place
        //    //model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
        //    var storyboardId = await _storyboardEngine.CreateStoryboard(userId, model);
        //    return Created("Created", storyboardId);
        //    //return Ok();
        //}

        [Authorize]
        [HttpPost]
        [Route(Routes.Storyboard.BaseStoryboard)]
        public async Task<ActionResult> Create([FromBody] StoryboardCreateModel model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            //put in better place
            //model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var storyboardId = await _storyboardEngine.CreateStoryboard(userId, model);
            return Created("Created", storyboardId);
            //return Ok();
        }


    }
}
