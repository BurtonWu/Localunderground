using LocalUndergroundServer.Data;
using LocalUndergroundServer.Infrastructure.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.Extensions.Startup
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder ApplySwagger(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            return app.UseSwaggerUI(config =>
            {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "LocalUnderground_API");
                config.RoutePrefix = string.Empty;
            });
        }

        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using(var services = app.ApplicationServices.CreateScope())
            {
                var dbContext = services.ServiceProvider.GetService<DatabaseContext>();
                dbContext.Database.Migrate();
            }
        }
    }
}
