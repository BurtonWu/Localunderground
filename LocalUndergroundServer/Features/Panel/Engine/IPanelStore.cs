using LocalUndergroundServer.Data.DTO.Panel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel.Engine
{
    public interface IPanelStore
    {
        Task<int> UploadImage(PanelImageDTO panelImage);
    }
}
