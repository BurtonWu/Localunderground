using LocalUndergroundServer.Data.Interfaces;
using LocalUndergroundServer.Data.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static LocalUndergroundServer.Constants.Validation.Post;

namespace LocalUndergroundServer.Features.Billboard.Models
{
    public class BillboardCreateModel : IMultiByteData
    {
        [MaxLength(200)]
        public string Title { get; set; }
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public List<ByteDataModel> ByteData { get; set; }

        //public Microsoft.AspNetCore.Http.IFormCollection ImageData { get; set; }
    }
}
