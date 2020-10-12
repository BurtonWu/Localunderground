using LocalUndergroundServer.Features.Billboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Engine
{
    public interface IBillboardEngine
    {
        Task<int> CreateBillboard(string description, string imageUrl, string userId);
        //Task<IEnumerable<BillboardModel>> GetBillboards();
        Task<BillboardDetailServiceModel> GetBillboardDetails(int id);
        Task<bool> UpdateBillboard(int id, string description, string userId);
        Task<bool> DeleteBillboard(int id, string userId);

    }
}
