using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.Classification;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.Classification.Models;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Classification.Engine
{
    public interface IClassificationStore
    {
        Task<List<CategoryDTO>> GetCategories();
    }
}
