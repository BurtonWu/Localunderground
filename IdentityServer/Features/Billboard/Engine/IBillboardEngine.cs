using IdentityServer.Features.Billboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Features.Billboard.Engine
{
    public interface IBillboardEngine
    {
        Task<int> CreateBillboard(string description, string imageUrl, string userId);
        Task<IEnumerable<BillboardServiceModel>> GetBillboards(string userId);
        Task<BillboardDetailServiceModel> GetBillboardDetails(int id);
        Task<bool> UpdateBillboard(int id, string description, string userId);
        Task<bool> DeleteBillboard(int id, string userId);

    }
}
