using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndgroundServer.Data.Models.Panel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static LocalUndergroundServer.Constants.Validation.Post;

namespace LocalUndergroundServer.Data.Models.Billboard
{
    public class BillboardCore
    {
        public int Id { get; set; }
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<PanelCore> Panels { get; set; }
    }
}
