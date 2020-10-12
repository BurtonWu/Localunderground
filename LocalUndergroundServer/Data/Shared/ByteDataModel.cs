using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Shared
{
    public class ByteDataModel
    {
        public byte[] ByteData { get; set; }
        public string FileName { get; set; }
        public long Size { get; set; }
    }
}
