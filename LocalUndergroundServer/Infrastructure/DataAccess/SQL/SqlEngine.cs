﻿using LocalUndergroundServer.Infrastructure.Extensions;
using LocalUndergroundServer.Infrastructure.Extensions.Startup;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.DataAccess.SQL
{
    public class SqlEngine : BaseDataAccess, ISqlEngine
    {
        public SqlEngine(IConfiguration configuration)
            : base(ConfigurationExtensionsExtended.GetDefaultConnectionString(configuration))
        {

        }

        public List<SqlParameter> AddSqlParameter(string parameter, object value, List<SqlParameter> sqlParameters)
        {
            if (sqlParameters == null) sqlParameters = new List<SqlParameter>();
            sqlParameters.Add(new SqlParameter(parameter, value != null ? value : DBNull.Value));
            return sqlParameters;
        }

        public List<SqlParameter> AddSqlParameter(string parameter, DataTable dataTable, List<SqlParameter> sqlParameters)
        {
            if (sqlParameters == null) sqlParameters = new List<SqlParameter>();
            sqlParameters.Add(GetParameter(parameter, dataTable));
            return sqlParameters;
        }

        public List<SqlParameter> AddSqlParameterOutput(string parameter, SqlDbType type, List<SqlParameter> sqlParameters)
        {
            if (sqlParameters == null) sqlParameters = new List<SqlParameter>();
            sqlParameters.Add(GetParameterOut(parameter, type));
            return sqlParameters;
        }

        public async Task<List<T>> ExecuteStoredProcedure<T>(string procedureName, List<SqlParameter> sqlParameters) where T : new()
        {
            var objs = new List<T>();
            var dataReader = GetDataReader(procedureName, sqlParameters);
            var columnSchema = dataReader.GetColumnSchema();
            try
            {
                while (await dataReader.ReadAsync())
                {
                    var obj = new T();
                    for (var i = 0; i < columnSchema.Count; i++)
                    {
                        var a = obj.GetType().GetProperty(columnSchema[i].ColumnName);
                        var b = dataReader.GetValue(i);
                        obj.GetType().GetProperty(columnSchema[i].ColumnName).SetValue(obj, dataReader.GetValue(i));
                    }
                    objs.Add(obj);
                }
            }catch(Exception e)
            {
                var a = 1;
            }
            return objs;
        }

        public async Task<List<SqlParameter>> ExecuteStoredProcedure(string procedureName, List<SqlParameter> sqlParameters)
        {
            await ExecuteNonQuery(procedureName, sqlParameters);
            return sqlParameters.Where(x => x.Direction == ParameterDirection.Output).ToList();
        }
    }
}
