﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.Extensions.Startup
{
    public static class ConfigurationExtensionsExtended
    {
        public static string GetDefaultConnectionString(this IConfiguration configuration)
            => configuration.GetConnectionString("LocalConnection");

        public static ApplicationSettings GetAppSettings(this IConfiguration configuration)
            => configuration.GetSection("AppSettings").Get<ApplicationSettings>();
    }
}
