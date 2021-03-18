using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Classification;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Classification.Engine;
using LocalUndergroundServer.Features.Classification.Models;
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
    public class ClassificationController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IClassificationStore _classificationStore;
        private readonly DatabaseContext _context;

        public ClassificationController(
            UserManager<User> userManager,
            IClassificationStore classificationStore,
            DatabaseContext context)
        {
            _userManager = userManager;
            _classificationStore = classificationStore;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.Classification.Base)]
        [Produces(typeof(List<CategoryDTO>))]
        public async Task<ActionResult<List<CategoryDTO>>> GetCategories()
        {
            return await _classificationStore.GetCategories();
        }
    }
}
