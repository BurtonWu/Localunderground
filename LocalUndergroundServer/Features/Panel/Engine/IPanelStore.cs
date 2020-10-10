using LocalUndergroundServer.Data.DTO.Panel;
using LocalUndergroundServer.Features.Panel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel.Engine
{
    public interface IPanelStore
    {
        Task<List<PanelImage>> GetImages();
        Task<int> UploadImage(PanelImageDTO panelImage);
    }
}
