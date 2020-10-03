using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LocalUndergroundServer.Constants;
using LocalUndergroundServer.Data;
using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LocalUndergroundServer
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddDatabase(_configuration.GetDefaultConnectionString())
                .AddIdentity()
                .AddJwtAuthentication(_configuration.GetAppSettings())
                //inject app settings
                .Configure<ApplicationSettings>(_configuration.GetSection("AppSettings"))
                .InjectServiceEngines()
                .AddSwagger()
                .AddApiControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.ApplySwagger();
            app.UseRouting();

            //Angular Hosted on different app so need cors
            app.UseCors((config) =>
            {
                config.AllowAnyOrigin();
                config.AllowAnyMethod();
                config.AllowAnyHeader();
            });
            app.UseAuthentication();
            app.UseAuthorization();
            //app.UseCors(config =>
            //{
            //    config.WithOrigins("http://localhost:4200/");
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.ApplyMigrations();
        }
    }
}
