using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Models.ImageWidget
{
    public class ImageWidgetDraft
    {
        public int ID { get; set; }
        public int DraftNumber { get; set; }
        public int StoryBoardID { get; set; }
        public int Sort { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
