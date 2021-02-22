using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Storyboard.Models;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Models.Params;
using LocalUndergroundServer.Features.StoryBoard.Params;
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

namespace LocalUndergroundServer.Features.StoryBoard
{
    [ApiController]
    public class StoryBoardController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IStoryBoardEngine _storyboardEngine;
        private readonly IStoryBoardStore _storyBoardStore;
        private readonly DatabaseContext _context;

        public StoryBoardController(
            UserManager<User> userManager,
            IStoryBoardEngine storyboardEngine,
            IStoryBoardStore storyBoardStore,
            DatabaseContext context)
        {
            _userManager = userManager;
            _storyboardEngine = storyboardEngine;
            _storyBoardStore = storyBoardStore;
            _context = context;
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
        [HttpGet]
        [Route(Routes.StoryBoard.StudioCard)]
        [Produces(typeof(List<StoryBoardStudioCardModel>))]
        public async Task<ActionResult<List<StoryBoardStudioCardModel>>> GetStudioCards()
        {
            return await _storyboardEngine.GetStoryBoardStudioCards(UserId);
        }


        [Authorize]
        [HttpGet]
        [Route(Routes.StoryBoard.Edit)]
        [Produces(typeof(StoryBoardModel))]
        public async Task<ActionResult<StoryBoardModel>> GetEditModel([FromQuery] int storyBoardId)
        {
            var model = await _storyboardEngine.GetStoryBoardEditModel(storyBoardId);
            return model;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.StoryBoard.View)]
        [Produces(typeof(StoryBoardModel))]
        public async Task<ActionResult<StoryBoardModel>> GetViewModel([FromQuery] int storyBoardId)
        {
            var model = await _storyboardEngine.GetStoryBoardViewModel(storyBoardId);
            return model;
        }



        [Authorize]
        [HttpPost]
        [Route(Routes.StoryBoard.Base)]
        public async Task<ActionResult> Create([FromBody] StoryBoardCreateParams model)
        {
            var storyboardId = await _storyboardEngine.CreateStoryBoard(UserId, model.Title, model.CategoryId, model.Synopsis, model.CoverPortrait);
            return Created("Created", storyboardId);
            //return Ok();
        }


        [Authorize]
        [HttpPut]
        [Route(Routes.StoryBoard.Base)]
        public async Task<ActionResult> Update([FromBody] StoryBoardUpdateParams model)
        {
            try
            {
                await _storyboardEngine.UpdateStoryBoard(model.Id, UserId, model.Title, model.Synopsis, model.CategoryId);
                return Ok();
            }
            catch (ApplicationException ex)
            {
                ModelState.AddModelError("error", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [Authorize]
        [HttpDelete]
        [Route(Routes.StoryBoard.Base)]
        public async Task<ActionResult> Delete([FromQuery] int storyBoardId)
        {
            await _storyboardEngine.DeleteStoryBoard(storyBoardId, UserId);
            return Ok();
        }
    }
}
