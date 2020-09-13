using IdentityServer.Data.Models;
using IdentityServer.Data.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static IdentityServer.Constants.Validation.Post;

namespace IdentityServer.Data.Models.Billboard
{
    public class BillboardPost
    {
        public int Id { get; set; }
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
