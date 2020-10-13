using LocalUndergroundServer.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Models
{
    public class BillboardPreviewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
        public IEnumerable<ImageBase> PreviewImages { get; set; }
    }
}
