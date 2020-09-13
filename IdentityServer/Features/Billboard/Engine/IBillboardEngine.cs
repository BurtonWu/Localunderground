using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Features.Billboard.Engine
{
    public interface IBillboardEngine
    {
        Task<int> CreateBillboard(string description, string imageUrl, string userId);
    }
}
