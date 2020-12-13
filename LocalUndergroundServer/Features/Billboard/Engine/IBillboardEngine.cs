//using LocalUndergroundServer.Features.Billboard.Constants;
//using LocalUndergroundServer.Features.Billboard.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace LocalUndergroundServer.Features.Billboard.Engine
//{
//    public interface IBillboardEngine
//    {
//        Task<List<BillboardPreviewModel>> GetBillboards(BillboardSort sortOrder = BillboardSort.Date, int sortDirection = 1,
//                  int currentIndex = 0, int loadCount = 20, string filterText = null);
//        Task<int> CreateBillboard(string userId, BillboardCreateModel model);
//        //Task<BillboardDetailServiceModel> GetBillboardDetails(int id);
//        //Task<bool> UpdateBillboard(int id, string description, string userId);
//        //Task<bool> DeleteBillboard(int id, string userId);

//    }
//}
