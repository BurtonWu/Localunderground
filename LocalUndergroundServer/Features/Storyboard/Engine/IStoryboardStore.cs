using LocalUndergroundServer.Data.DTO.Storyboard;
using LocalUndergroundServer.Data.Models.Storyboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.Storyboard.Engine
{
    public interface IStoryboardStore
    {
        Task<int> CreateStoryboard(StoryboardCreateDTO model);
        Task<List<StoryboardCore>> GetStoryboards(int currentIndex, int loadCount = 20, string filterText = null);
        //Task<int> UploadImage(int billboardId, string name, long size, byte[] imageData);
    }
}
