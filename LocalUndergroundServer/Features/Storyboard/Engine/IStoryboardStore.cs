using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using LocalUndergroundServer.Features.StoryBoard.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public interface IStoryBoardStore
    {
        Task<bool> StoryBoardExists(int id, string userId);
        Task<StoryBoardDTO> GetStoryBoard(int id);
        Task<int> CreateStoryBoard(StoryBoardCreateDTO model);
        Task<List<StoryBoardDTO>> GetStoryBoards(int currentIndex, int loadCount = 20, string filterText = null, int? categoryId = null);
        Task<List<StoryBoardDTO>> GetStoryBoards(string userId);
        Task UpdateStoryBoard(int id, string userId, string title, string synopsis, int categoryId);
        Task<bool> DeleteStoryBoard(int id);
        //Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData);
    }
}
