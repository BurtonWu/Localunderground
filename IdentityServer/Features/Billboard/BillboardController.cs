using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer.Constants;
using IdentityServer.Data;
using IdentityServer.Data.Models;
using IdentityServer.Data.Models.Identity;
using IdentityServer.Features.Billboard.Engine;
using IdentityServer.Features.Billboard.Models;
using IdentityServer.Infrastructure;
using IdentityServer.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace IdentityServer.Features.Billboard
{
    [ApiController]
    public class BillboardController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IBillboardEngine _billboardEngine;
        private readonly AuthDbContext _context;

        public BillboardController(
            UserManager<User> userManager,
            IBillboardEngine billboardEngine,
            AuthDbContext context)

        {
            _userManager = userManager;
            _billboardEngine = billboardEngine;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.Billboard.Base)]
        public async Task<ActionResult<List<BillboardServiceModel>>> GetBillboards()
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            var billboards = await _billboardEngine.GetBillboards(userId);
            return Ok(billboards);
        }

        [Authorize]
        [HttpGet]
        [Route(Routes.Billboard.Details)]
        public async Task<ActionResult<BillboardDetailServiceModel>> GetBillboardDetails([FromQuery]int id)
        {
            return await _billboardEngine.GetBillboardDetails(id);
        }

        [Authorize]
        [HttpPut]
        [Route(Routes.Billboard.Base)]
        public async Task<ActionResult<bool>> UpdateBillboard([FromBody]BillboardUpdateRequestModel model)
        {

            var updated = await _billboardEngine.UpdateBillboard(model.Id, model.Description, User.GetClaim(ClaimTypes.NameIdentifier));
            if (updated) return Ok();
            else return BadRequest();
        }

        [Authorize]
        [HttpDelete]
        [Route(Routes.Billboard.Base)]
        public async Task<ActionResult<bool>> DeleteBillboard([FromQuery]int id)
        {

            var deleted = await _billboardEngine.DeleteBillboard(id, User.GetClaim(ClaimTypes.NameIdentifier));
            if (deleted) return Ok();
            else return BadRequest();
        }

        [Authorize]
        [HttpPost]
        [Route(Routes.Billboard.Base)]
        public async Task<ActionResult> Create(BillboardCreateRequestModel model)
        {
            var userId = User.GetClaim(ClaimTypes.NameIdentifier);
            var postId = await _billboardEngine.CreateBillboard(model.Description, model.ImageUrl, userId);
            return Created("Create", postId);
        }
    }
}
