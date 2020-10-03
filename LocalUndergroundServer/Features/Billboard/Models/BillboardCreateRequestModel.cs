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
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
    }
}
