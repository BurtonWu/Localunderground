using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.DataAccess.SQL
{
    public interface ISqlEngine
    {
        List<SqlParameter> AddSqlParameterOutput(string parameter, SqlDbType type, List<SqlParameter> sqlParameters);
        List<SqlParameter> AddSqlParameter(string parameter, object value, List<SqlParameter> sqlParameters = null);
        Task<List<T>> ExecuteStoredProcedure<T>(string procedureName, List<SqlParameter> parameters) where T : new();
        Task<List<SqlParameter>> ExecuteStoredProcedure(string procedureName, List<SqlParameter> sqlParameters);
    }
}
