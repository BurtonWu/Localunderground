using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Features.Billboard.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Engine
{
    public class BillboardEngineBase
    {
        public static List<BillboardCore> SortBillboardCores(BillboardSort sortOrder, IEnumerable<BillboardCore> cores, int sortDirection = 1)
        {
            switch(sortOrder)
            {
                case BillboardSort.Title:
                    if (sortDirection == 1)
                        return cores.OrderByDescending(x => x.Title).ToList();
                    else
                        return cores.OrderBy(x => x.Title).ToList();
                case BillboardSort.Price:
                    if (sortDirection == 1)
                        return cores.OrderByDescending(x => x.Price).ToList();
                    else
                        return cores.OrderBy(x => x.Price).ToList();
                case BillboardSort.Date:
                    if (sortDirection == 1)
                        return cores.OrderByDescending(x => x.CreatedDate).ToList();
                    else
                        return cores.OrderBy(x => x.CreatedDate).ToList();
                default:
                    return cores.ToList();
            }
        }
    }
}
