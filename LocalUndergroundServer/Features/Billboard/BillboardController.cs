using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data;
using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Billboard.Constants;
using LocalUndergroundServer.Features.Billboard.Engine;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Features.Billboard.Models.Params;
using LocalUndergroundServer.Infrastructure;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.Extensions;
using LocalUndergroundServer.Infrastructure.Extensions.Http;
using LocalUndergroundServer.Infrastructure.Extensions.Startup;
using LocalUndergroundServer.Shared.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace LocalUndergroundServer.Features.Billboard
{
    [ApiController]
    public class BillboardController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IBillboardEngine _billboardEngine;
        private readonly DatabaseContext _context;

        public BillboardController(
            UserManager<User> userManager,
            IBillboardEngine billboardEngine,
            DatabaseContext context)

        {
            _userManager = userManager;
            _billboardEngine = billboardEngine;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.Billboard.BaseBillboard)]
        public async Task<ActionResult<List<BillboardPreviewModel>>> GetBillboards([FromQuery]BillboardGetParams model)
        {
            //var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            //var billboards = await _billboardEngine.GetBillboards((BillboardSort)model.SortOrder, model.SortDirection, 
            //    model.CurrentIndex, model.LoadCount, model.FilterText);
            //return Ok(billboards);
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route(Routes.Billboard.BaseBillboard)]
        public async Task<ActionResult> Create([FromForm]BillboardCreateModel model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            //put in better place
            model.ByteData = HttpRequestExtensions.PopulatePostBodyModel(Request, FileExtension.IMAGE_EXTENSIONS);
            var billboardId = await _billboardEngine.CreateBillboard(userId, model);
            //return Created("Created", billboardId);
            return Ok();
        }

        //[Authorize]
        //[HttpGet]
        //[Route(Routes.Billboard.Details)]
        //public async Task<ActionResult<BillboardDetailServiceModel>> GetBillboardDetails([FromQuery]int id)
        //{
        //    return await _billboardEngine.GetBillboardDetails(id);
        //}

        //[Authorize]
        //[HttpPut]
        //[Route(Routes.Billboard.BaseBillboard)]
        //public async Task<ActionResult<bool>> UpdateBillboard([FromBody]BillboardUpdateRequestModel model)
        //{

        //    var updated = await _billboardEngine.UpdateBillboard(model.Id, model.Description, User.GetClaim(ClaimTypes.NameIdentifier));
        //    if (updated) return Ok();
        //    else return BadRequest();
        //}

        //[Authorize]
        //[HttpDelete]
        //[Route(Routes.Billboard.BaseBillboard)]
        //public async Task<ActionResult<bool>> DeleteBillboard([FromQuery]int id)
        //{

        //    var deleted = await _billboardEngine.DeleteBillboard(id, User.GetClaim(ClaimTypes.NameIdentifier));
        //    if (deleted) return Ok();
        //    else return BadRequest();
        //}

     
    }
}
