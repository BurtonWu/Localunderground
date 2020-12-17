using LocalUndergroundServer.Data.Interfaces;
using LocalUndergroundServer.Data.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static LocalUndergroundServer.Constants.Validation.Post;

namespace LocalUndergroundServer.Features.StoryBoard.Params
{
    public class StoryBoardCreateParams
    {
        [MaxLength(200)]
        public string Title { get; set; }
        [MaxLength(MaxDescriptionLength)]
        public string Synopsis { get; set; }
    }
}
