using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.BillBoard.Engine;
using LocalUndergroundServer.Features.BillBoard.Models;
using LocalUndergroundServer.Features.BillBoard.Params;
using LocalUndergroundServer.Features.StoryBoard.Constants;
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

namespace LocalUndergroundServer.Features.BillBoard
{
    [ApiController]
    public class BillBoardController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IBillBoardEngine _billBoardEngine;

        private readonly DatabaseContext _context;

        public BillBoardController(
            UserManager<User> userManager,
            IBillBoardEngine billBoardEngine,
            DatabaseContext context)

        {
            _userManager = userManager;
            _billBoardEngine = billBoardEngine;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Produces(typeof(List<PostCardModel>))]
        [Route(Routes.BillBoard.PostCard)]
        public async Task<ActionResult<List<PostCardModel>>> GetPostCards([FromQuery] PostCardGetParams model)
        {
            return await _billBoardEngine.GetPostCards((StoryBoardSort)model.SortOrder, model.SortDirection,
                model.CurrentIndex, model.LoadCount, model.FilterText);
        }

    }
}
