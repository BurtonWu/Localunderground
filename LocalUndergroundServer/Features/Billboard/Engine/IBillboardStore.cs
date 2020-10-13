using LocalUndergroundServer.Data.DTO.Billboard;
using LocalUndergroundServer.Data.Models.Billboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Engine
{
    public interface IBillboardStore
    {
        Task<List<BillboardCore>> GetBillboards(int currentIndex, int loadCount = 20, string filterText = null);
        Task<int> CreateBillboard(BillboardCreateDTO model);
        Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData);
    }
}
