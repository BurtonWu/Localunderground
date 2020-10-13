using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Billboard.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.DataAccess
{
    public class DatabaseContext : IdentityDbContext<User>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {

        }

        public DbSet<BillboardCore> BillboardCore { get; set; }
        public DbSet<BillboardImage> BillboardImage { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<BillboardCore>()
                .HasMany(x => x.PreviewImages)
                .WithOne(x => x.BillboardCore)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<BillboardImage>()
                .HasOne(x => x.BillboardCore)
                .WithMany(x => x.PreviewImages)
                .OnDelete(DeleteBehavior.Restrict);

            //builder
            //    .Entity<PanelImage>()
            //    .HasOne(x => x.Panel)
            //    .WithMany(x => x.PanelImages)
            //    .HasForeignKey(x => x.PanelId)
            //    .OnDelete(DeleteBehavior.Restrict);


            base.OnModelCreating(builder);
        }
    }
}
