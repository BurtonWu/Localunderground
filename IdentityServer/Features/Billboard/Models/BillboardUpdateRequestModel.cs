using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static IdentityServer.Constants.Validation.Post;

namespace IdentityServer.Features.Billboard.Models
{
    public class BillboardUpdateRequestModel
    {
        public int Id { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
