using LocalUndergroundServer.Features.Panel.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel.Engine
{
    public interface IPanelEngine
    {
        Task<int> CreatePanel(string description, string imageUrl, string userId);
        Task<IEnumerable<PanelServiceModel>> GetPanels(string userId);
        Task<PanelDetailServiceModel> GetPanelDetails(int id);
        Task<bool> UpdatePanel(int id, string description, string userId);
        Task<bool> DeletePanel(int id, string userId);
        Task<int> UploadPanelImage(IFormFile file);


    }
}
