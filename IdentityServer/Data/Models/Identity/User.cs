using IdentityServer.Data.Models.Billboard;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Data.Models.Identity
{
    public class User : IdentityUser
    {
        public IEnumerable<BillboardPost> BillboardPosts { get; } = new HashSet<BillboardPost>();
    }
}
