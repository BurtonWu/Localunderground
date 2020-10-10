using LocalUndergroundServer.Data;
using LocalUndergroundServer.Data.DTO.Panel;
using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndergroundServer.Features.Panel.Models;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndgroundServer.Data.Models.Panel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Panel.Engine
{
    public class PanelEngine : IPanelEngine
    {
        private readonly AuthDbContext _context;
        private readonly IPanelStore _panelStore;

        public PanelEngine(
            AuthDbContext context,
            IPanelStore panelStore
            )
        {
            _context = context;
            _panelStore = panelStore;
        }
        public async Task<int> CreatePanel(string description, string imageUrl, string userId)
        {
            var post = new PanelCore()
            {
                Description = description,
                UserId = userId
            };

            _context.PanelCore.Add(post);
            await _context.SaveChangesAsync();
            return post.Id;
        }

        public async Task<IEnumerable<PanelServiceModel>> GetPanels(string userId)
        {
            return await _context.PanelCore
                .Where(x => x.UserId == userId)
                .Select(x => new PanelServiceModel()
                {
                    Id = x.Id,
                }).ToListAsync();
        }

        public async Task<PanelDetailServiceModel> GetPanelDetails(int id)
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


            return await _context.PanelCore
                .Where(x => x.Id == id)
                .Select(x => new PanelDetailServiceModel()
                {
                    Id = x.Id,
                    ImageUrl = string.Empty
                }).SingleOrDefaultAsync();

        }

        public async Task<bool> UpdatePanel(int id, string description, string userId)
        {
            var billboard = await _context.PanelCore.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if(billboard == null) return false;

            billboard.Description = description;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePanel(int id, string userId)
        {
            var panelCore = await _context.PanelCore.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (panelCore == null) return false;

            _context.PanelCore.Remove(panelCore);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> UploadPanelImage(IFormFile file)
        {
            var filename = Path.GetFileName(file.FileName);
            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            var fileSize = file.Length;

            if (fileExtension == ".jpg" || fileExtension == ".png")
            {
                using (var fileStream = file.OpenReadStream())
                {
                    var stream = new MemoryStream();
                    await fileStream.CopyToAsync(stream);
                    var bytes = stream.ToArray();

                    var panelImage = new PanelImageDTO()
                    {
                        Name = filename,
                        ImageData = bytes,
                        Size = fileSize
                    };
                    return await _panelStore.UploadImage(panelImage);
                }
            }

            return 0;
        }

        //public async Task<PanelImage> GetPanelImages()
        //{

        //}
    }

}
