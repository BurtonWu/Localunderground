using IdentityServer4.Extensions;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.Engine;
using LocalUndergroundServer.Features.StoryBoard.Models;
using LocalUndergroundServer.Features.StoryBoard.Models.Params;
using LocalUndergroundServer.Features.ImageWidget.Engine;
using LocalUndergroundServer.Features.ImageWidget.Models;
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
using LocalUndergroundServer.Infrastructure.Extensions.Http;
using LocalUndergroundServer.Infrastructure.Request;

namespace LocalUndergroundServer.Features.ImageWidget
{
    [ApiController]
    public class ImageWidgetController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IImageWidgetEngine _imageWidgetEngine;
        private readonly IImageWidgetStore _imageWidgetStore;
        private readonly DatabaseContext _context;


        public ImageWidgetController(
            UserManager<User> userManager,
            IImageWidgetEngine imageWidgetEngine,
            IImageWidgetStore imageWidgetStore,
            DatabaseContext context)

        {
            _userManager = userManager;
            _imageWidgetEngine = imageWidgetEngine;
            _imageWidgetStore = imageWidgetStore;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.ImageWidget.Base)]
        public async Task<ActionResult> GetImageWidgets([FromQuery] int storyBoardId)
        {
            var widgets = await _imageWidgetEngine.GetImageWidgetModels(UserId, storyBoardId);
            return Ok(widgets);
        }


        [Authorize]
        [HttpPost]
        [Route(Routes.ImageWidget.Base)]
        public async Task<ActionResult> CreateImageWidget([FromForm] ImageWidgetCreateParams model)
        {
            var imageData = HttpExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var id = await _imageWidgetStore.CreateImageWidget(UserId, model.StoryBoardId, model.Sort, imageData);
            return Created("Created", id);
        }

        [Authorize]
        [HttpPut]
        [Route(Routes.ImageWidget.Base)]
        public async Task<ActionResult> UpdateImageWidget([FromBody] ImageWidgetUpdateParams model)
        {
            var imageData = HttpExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var isUpdated = await _imageWidgetStore.UpdateImageWidget(UserId, model.Id, model.StoryBoardId, model.Sort, imageData);
            return Ok(isUpdated);
        }

    }
}
