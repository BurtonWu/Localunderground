using LocalUndergroundServer.Data;
using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Billboard.Engine
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
            var post = new BillboardCore()
            {
                Description = description,
                ImageUrl = imageUrl,
                UserId = userId
            };

            _context.BillboardCore.Add(post);
            await _context.SaveChangesAsync();
            return post.Id;
        }

        public async Task<IEnumerable<BillboardServiceModel>> GetBillboards(string userId)
        {
            return await _context.BillboardCore
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
            //var BillboardCore = await _context.BillboardCore.SingleOrDefaultAsync(x => x.Id == id);
            //if(BillboardCore != null)
            //{
            //    model.Id = BillboardCore.Id;
            //    model.Description = BillboardCore.Description;
            //    model.ImageUrl = BillboardCore.ImageUrl;
            //}
            //return model;


            return await _context.BillboardCore
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

        public async Task<bool> UpdateBillboard(int id, string description, string userId)
        {
            var billboard = await _context.BillboardCore.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if(billboard == null) return false;

            billboard.Description = description;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBillboard(int id, string userId)
        {
            var billboard = await _context.BillboardCore.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (billboard == null) return false;

            _context.BillboardCore.Remove(billboard);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
