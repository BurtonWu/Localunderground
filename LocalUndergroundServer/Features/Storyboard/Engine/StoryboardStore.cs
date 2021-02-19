using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.Classification.Constants;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.DTO;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public class StoryBoardStore : IStoryBoardStore
    {
        private readonly ISqlEngine _sqlEngine;
        private readonly DatabaseContext _dbContext;

        public StoryBoardStore(
            ISqlEngine sqlEngine,
            DatabaseContext dbContext
            )
        {
            _sqlEngine = sqlEngine;
            _dbContext = dbContext;
        }

        public async Task<bool> StoryBoardExists(int id, string userId)
        {
            var core = await _dbContext.StoryBoardCore.SingleOrDefaultAsync(x => x.ID == id && x.UserID == userId);
            return core != null;
        }

        public async Task<StoryBoardDTO> GetStoryBoard(int id)
        {
            var core = await _dbContext.StoryBoardCore.SingleOrDefaultAsync(x => x.ID == id);
            if (core == null) return null;

            return new StoryBoardDTO()
            {
                Id = core.ID,
                Synopsis = core.Synopsis,
                Title = core.Title,
                CategoryId = core.CategoryId,
                CreatedOn = core.CreatedOn,
                LastModifiedOn = core.ModifiedOn,
                CoverPortrait = core.CoverPortrait != null ? Convert.ToBase64String(core.CoverPortrait) : null
            };
        }

        public async Task<List<StoryBoardDTO>> GetStoryBoards(int currentIndex, int loadCount = 20, string filterText = null, CategoryId categoryId = CategoryId.All)
        {
            if (_dbContext.StoryBoardCore.Count() == 0)
                return new List<StoryBoardDTO>();

            return await _dbContext.StoryBoardCore
                //.Skip(currentIndex)
                //.Take(loadCount)
                .Where(x => (string.IsNullOrWhiteSpace(filterText) || x.Title == filterText) && (categoryId == CategoryId.All || x.CategoryId == (int)categoryId))
                .Select(x => new StoryBoardDTO()
                {
                    Id = x.ID,
                    Synopsis = x.Synopsis,
                    Title = x.Title,
                    CoverPortrait = x.CoverPortrait != null ? Convert.ToBase64String(x.CoverPortrait) : null,
                    CreatedOn = x.CreatedOn,
                    LastModifiedOn = x.ModifiedOn
                })
                .ToListAsync();
        }

        public async Task<List<StoryBoardDTO>> GetStoryBoards(string userId)
        {
            if (_dbContext.StoryBoardCore.Count() == 0)
                return new List<StoryBoardDTO>();

            return await _dbContext.StoryBoardCore
                .Where(x => x.UserID == userId)
                .Select(x => new StoryBoardDTO()
                {
                    Id = x.ID,
                    Synopsis = x.Synopsis,
                    Title = x.Title,
                    CoverPortrait = x.CoverPortrait != null ? Convert.ToBase64String(x.CoverPortrait) : null
                })
                .ToListAsync();
        }

        public async Task UpdateStoryBoard(int id, string userId, string title, string synopsis, int categoryId)
        {
            var storyBoard = await _dbContext.StoryBoardCore.SingleOrDefaultAsync(x => x.ID == id && x.UserID == userId);
            if (storyBoard != null)
            {
                storyBoard.Title = title;
                storyBoard.Synopsis = synopsis;
                storyBoard.CategoryId = categoryId;
            }
            _dbContext.Update(storyBoard);
            await _dbContext.SaveChangesAsync();
        }


        public async Task<int> CreateStoryBoard(StoryBoardCreateDTO model)
        {
            var core = new StoryBoardCore()
            {
                Synopsis = model.Synopsis,
                Title = model.Title,
                UserID = model.UserId,
                CoverPortrait = model.CoverPortrait,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now,
                CategoryId = model.CategoryId
            };
            await _dbContext.StoryBoardCore.AddAsync(core);
            await _dbContext.SaveChangesAsync();
            return core.ID;
        }

        public async Task DeleteStoryBoard(int id)
        {
            var sqlParameters = _sqlEngine.AddSqlParameter("@StoryBoardID", id);
            await _sqlEngine.ExecuteStoredProcedure("spDeleteStoryBoard", sqlParameters);
        }


        //public async Task<List<PanelImage>> GetImages()
        //{
        //    //var sqlParameters = _sqlEngine.AddSqlParameter("@Name", panelImage.Name);
        //    //_sqlEngine.AddSqlParameter("@Size", panelImage.Size, sqlParameters);
        //    //_sqlEngine.AddSqlParameter("@ImageData", panelImage.ImageData, sqlParameters);
        //    //_sqlEngine.AddSqlParameterOutput("@Id", SqlDbType.Int, sqlParameters);

        //    var data = await _sqlEngine.ExecuteStoredProcedure<PanelImageDTO>("spGetPanelImages", null);
        //    return data.Select(x => new PanelImage()
        //    {
        //        ImageData = Convert.ToBase64String(x.ImageData),
        //        Name = x.Name
        //    }).ToList();
        //}
    }
}
