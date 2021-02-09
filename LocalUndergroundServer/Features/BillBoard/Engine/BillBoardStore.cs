using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Features.BillBoard.Engine
{
    public class BillBoardStore : IBillBoardStore
    {
        private readonly ISqlEngine _sqlEngine;
        private readonly DatabaseContext _dbContext;

        public BillBoardStore(
            ISqlEngine sqlEngine,
            DatabaseContext dbContext
            )
        {
            _sqlEngine = sqlEngine;
            _dbContext = dbContext;
        }
    }
}
