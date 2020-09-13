using IdentityServer.Data;
using IdentityServer.Data.Models.Billboard;
using IdentityServer.Features.Billboard.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<BillboardServiceModel>> GetBillboards(string userId)
        {
            return await _context.BillboardPost
                .Where(x => x.UserId == userId)
                .Select(x => new BillboardServiceModel()
                {
                    Id = x.Id,
                    ImageUrl = x.ImageUrl
                }).ToListAsync();
        }

        public async Task<BillboardDetailServiceModel> GetBillboardDetails(int id)
        {
            //var model = new BillboardDetailServiceModel();
            //var billboardPost = await _context.BillboardPost.SingleOrDefaultAsync(x => x.Id == id);
            //if(billboardPost != null)
            //{
            //    model.Id = billboardPost.Id;
            //    model.Description = billboardPost.Description;
            //    model.ImageUrl = billboardPost.ImageUrl;
            //}
            //return model;


            return await _context.BillboardPost
                .Where(x => x.Id == id)
                .Select(x => new BillboardDetailServiceModel()
                {
                    Id = x.Id,
                    ImageUrl = x.ImageUrl,
                    Description = x.Description,
                    UserId = x.UserId,
                    Username = x.User.UserName
                }).SingleOrDefaultAsync();

        }
    }
}
