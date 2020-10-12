using LocalUndergroundServer.Data.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Data.Interfaces
{
    public interface IMultiByteData
    {
        public List<ByteDataModel> ByteData { get; set; }
    }
}
