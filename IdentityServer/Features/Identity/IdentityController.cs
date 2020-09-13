using IdentityServer.Constants;
using IdentityServer.Data.Models;
using IdentityServer.Data.Models.Identity;
using IdentityServer.Features.Identity.Engine;
using IdentityServer.Features.Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IdentityServer.Features.Identity
{
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IIdentityEngine _identityEngine;
        private readonly ApplicationSettings _appSettings;

        public IdentityController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IIdentityEngine identityEngine,
            IOptions<ApplicationSettings> options)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _identityEngine = identityEngine;
            _appSettings = options.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route(Routes.Identity.Register)]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequestModel model)
        {
            var newUser = new User()
            {
                UserName = model.Username,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(newUser, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route(Routes.Identity.Login)]
        public async Task<ActionResult<LoginResponseModel>> Login([FromBody] LoginUserRequestModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var response = new LoginResponseModel()
                {
                    Token = _identityEngine.GenerateJwtToken(_appSettings.JwtSecret, user.Id, user.UserName)
                };
                return Ok(response);
            }
            return Unauthorized();
        }
    }
}
