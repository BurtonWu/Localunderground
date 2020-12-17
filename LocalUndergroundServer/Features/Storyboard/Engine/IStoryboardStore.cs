﻿using LocalUndergroundServer.Data.DTO.StoryBoard;
using LocalUndergroundServer.Data.Models.StoryBoard;
using LocalUndergroundServer.Features.StoryBoard.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.StoryBoard.Engine
{
    public interface IStoryBoardStore
    {
        Task<int> CreateStoryBoard(StoryBoardCreateDTO model);
        Task<List<StoryBoardCore>> GetStoryBoards(int currentIndex, int loadCount = 20, string filterText = null);
        //Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData);
    }
}
