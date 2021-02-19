using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.Classification;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.Classification.Models;
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

namespace LocalUndergroundServer.Features.Classification.Engine
{
    public class ClassificationStore : IClassificationStore
    {
        private readonly ISqlEngine _sqlEngine;
        private readonly DatabaseContext _dbContext;

        public ClassificationStore(
            ISqlEngine sqlEngine,
            DatabaseContext dbContext
            )
        {
            _sqlEngine = sqlEngine;
            _dbContext = dbContext;
        }
        public async Task<List<CategoryDTO>> GetCategories()
        {
            return await _dbContext.Category.Select(x =>
            new CategoryDTO() { 
                CategoryId = x.ID,
                CategoryName = x.CategoryName
            }).ToListAsync();
        }

    }
}
