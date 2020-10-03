using LocalUndergroundServer.Shared.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static LocalUndergroundServer.Constants.Validation.Post;

namespace LocalUndergroundServer.Features.Panel.Models
{
    public class PanelCreateRequestModel : ImageUpload
    {
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
    }
}
