using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.DTO.Storyboard
{
    public class StoryboardCreateDTO
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
    }
}
