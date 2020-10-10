using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Data.Models.Billboard;
using LocalUndergroundServer.Data.Models.Identity;
using LocalUndergroundServer.Features.Billboard.Models;
using LocalUndgroundServer.Data.Models.Panel;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.DataAccess
{
    public class AuthDbContext : IdentityDbContext<User>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options)
            : base(options)
        {

        }

        public DbSet<BillboardCore> BillboardCore { get; set; }
        public DbSet<PanelCore> PanelCore { get; set; }
        //public DbSet<PanelImage> PanelImage { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<PanelCore>()
                .HasOne(x => x.User)
                .WithMany(x => x.Panels)
                .HasForeignKey(x => x.UserId)
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
