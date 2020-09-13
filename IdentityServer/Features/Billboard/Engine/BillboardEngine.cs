﻿using IdentityServer.Data;
using IdentityServer.Data.Models.Billboard;
using IdentityServer.Features.Billboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Features.Billboard.Engine
{
    public class BillboardEngine : IBillboardEngine
    {
        private readonly AuthDbContext _context;

        public BillboardEngine(AuthDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateBillboard(string description, string imageUrl, string userId)
        {
            var post = new BillboardPost()
            {
                Description = description,
                ImageUrl = imageUrl,
                UserId = userId
            };

            _context.BillboardPost.Add(post);
            await _context.SaveChangesAsync();
            return post.Id;
        }
    }
}
