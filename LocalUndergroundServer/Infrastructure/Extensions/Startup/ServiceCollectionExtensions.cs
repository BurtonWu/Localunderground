using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data;
using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Identity.Engine;
using LocalUndergroundServer.Features.Storyboard.Engine;
using LocalUndergroundServer.Infrastructure.DataAccess;
using LocalUndergroundServer.Infrastructure.DataAccess.SQL;
using LocalUndergroundServer.Infrastructure.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.Extensions.Startup
{
    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection AddDatabase(this IServiceCollection services, string connectionString)
        {
            return services.AddDbContext<DatabaseContext>(config =>
            {
                config.UseSqlServer(connectionString);
            });
        }

        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            //it calls add authentication, the add authentication below overwrites it with jwt config
            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.Password.RequireDigit = false;
                config.Password.RequiredUniqueChars = 0;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = false;
                config.Password.RequiredLength = 1;
            })
            .AddEntityFrameworkStores<DatabaseContext>(); //to bridge the identity to use the database
            //.AddDefaultTokenProviders(); //default mechanism for token, appears in password reset link, token in url
            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, ApplicationSettings appSettings)
        {
            var key = Encoding.UTF8.GetBytes(appSettings.JwtSecret);
            services.AddAuthentication((config) =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer((config) =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidIssuer = "http://localhost:44368/",
                    ValidAudience = "http://localhost:44368/",
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                };
            });

            //services.ConfigureApplicationCookie(config =>
            //{
            //    config.Cookie.Name = "LocalUndergroundServer.Cookie";
            //    config.LoginPath = "/Authorization/Login";
            //});
            return services;
        }

        public static IServiceCollection InjectServiceEngines(this IServiceCollection services)
        {
            return services.AddTransient<IIdentityEngine, IdentityEngine>()
                           .AddTransient<ISqlEngine, SqlEngine>()
                           .AddTransient<IStoryboardStore, StoryboardStore>()
                           .AddTransient<IStoryboardEngine, StoryboardEngine>();


        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            return services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "LocalUnderground_API",
                    Description = "A simple example ASP.NET Core Web API",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Shayne Boyer",
                        Email = string.Empty,
                        Url = new Uri("https://twitter.com/spboyer"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("https://example.com/license"),
                    }
                });
            });
        }

        public static void AddApiControllers(this IServiceCollection services)
        {
            services.AddControllers(config => config.Filters.Add<ModelOrNotFoundActionFilter>());
        }
    }
}
