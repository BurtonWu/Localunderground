﻿using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Models.Params;
using LocalUndergroundServer.Features.StoryBoard.Params;
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

namespace LocalUndergroundServer.Features.StoryBoard
{
    [ApiController]
    public class StoryBoardController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IStoryBoardEngine _storyboardEngine;
        private readonly DatabaseContext _context;

        public StoryBoardController(
            UserManager<User> userManager,
            IStoryBoardEngine storyboardEngine,
            DatabaseContext context)

        {
            _userManager = userManager;
            _storyboardEngine = storyboardEngine;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.StoryBoard.BaseStoryBoard)]
        public async Task<ActionResult<List<StoryBoardModel>>> GetStoryBoards([FromQuery] StoryBoardGetParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            var billboards = await _storyboardEngine.GetStoryBoards((StoryBoardSort)model.SortOrder, model.SortDirection,
                model.CurrentIndex, model.LoadCount, model.FilterText);
            return Ok(billboards);
        }

        //[Authorize]
        //[HttpPost]
        //[Route(Routes.StoryBoard.BaseStoryBoard)]
        //public async Task<ActionResult> Create([FromForm] StoryBoardCreateModel model)
        //{
        //    var userId = User.GetClaim(ClaimTypes.NameIdentifier);
        //    //put in better place
        //    //model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
        //    var storyboardId = await _storyboardEngine.CreateStoryBoard(userId, model);
        //    return Created("Created", storyboardId);
        //    //return Ok();
        //}

        [Authorize]
        [HttpPost]
        [Route(Routes.StoryBoard.BaseStoryBoard)]
        public async Task<ActionResult> Create([FromBody] StoryBoardCreateParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            //put in better place
            //model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var storyboardId = await _storyboardEngine.CreateStoryBoard(userId, model.Title, model.Synopsis);
            return Created("Created", storyboardId);
            //return Ok();
        }


        [Authorize]
        [HttpPut]
        [Route(Routes.StoryBoard.BaseStoryBoard)]
        public async Task<ActionResult> Update([FromBody] StoryBoardUpdateParams model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            //put in better place
            //model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var storyboardId = await _storyboardEngine.CreateStoryBoard(userId, model.Title, model.Synopsis);
            return Created("Created", storyboardId);
            //return Ok();
        }
    }
}
