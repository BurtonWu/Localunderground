using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.StoryBoard
{
    public class StoryboardDraft
    {
        public int StoryBoardID { get; set; }
        public int DraftNumber { get; set; }
        public string DraftName { get; set; }
        public string Title{ get; set; }
        public string Synopsis { get; set; }
        public byte[] CoverPortrait { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int CategoryID { get; set; }
    }
}
