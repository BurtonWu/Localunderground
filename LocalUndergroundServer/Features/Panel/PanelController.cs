using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Features.Panel.Engine;
using LocalUndergroundServer.Features.Panel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel
{
    public class PanelController: ControllerBase
    {
        private readonly IPanelEngine _panelEngine;

        public PanelController(
            IPanelEngine panelEngine)
        {
            _panelEngine = panelEngine;
        }

        [Authorize]
        [HttpPost]
        [Route(Routes.Panel.UploadImage)]
        public async Task<ActionResult> Upload()
        {

            var id = await _panelEngine.UploadPanelImage(Request.Form.Files[0]);
            return Ok(id);
        }
    }
}
