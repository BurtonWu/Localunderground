using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static LocalUndergroundServer.Constants.Validation.Post;

namespace LocalUndergroundServer.Features.Billboard.Models
{
    public class BillboardCreateRequestModel
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        //public Microsoft.AspNetCore.Http.IFormCollection ImageData { get; set; }
    }
}
