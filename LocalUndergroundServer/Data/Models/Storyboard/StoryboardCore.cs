using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.StoryBoard
{
    public class StoryBoardCore
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public byte[] CoverPortrait { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
