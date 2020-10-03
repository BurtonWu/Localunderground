using Microsoft.EntityFrameworkCore.Migrations;

namespace LocalUndergroundServer.Migrations
{
    public partial class panelcore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillboardPost");

            migrationBuilder.CreateTable(
                name: "BillboardCore",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(maxLength: 2000, nullable: true),
                    ImageUrl = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillboardCore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillboardCore_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PanelCore",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    BillboardId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanelCore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PanelCore_BillboardCore_BillboardId",
                        column: x => x.BillboardId,
                        principalTable: "BillboardCore",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PanelCore_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PanelImage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PanelId = table.Column<int>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanelImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PanelImage_PanelCore_PanelId",
                        column: x => x.PanelId,
                        principalTable: "PanelCore",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillboardCore_UserId",
                table: "BillboardCore",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelCore_BillboardId",
                table: "PanelCore",
                column: "BillboardId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelCore_UserId",
                table: "PanelCore",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelImage_PanelId",
                table: "PanelImage",
                column: "PanelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PanelImage");

            migrationBuilder.DropTable(
                name: "PanelCore");

            migrationBuilder.DropTable(
                name: "BillboardCore");

            migrationBuilder.CreateTable(
                name: "BillboardPost",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillboardPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillboardPost_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillboardPost_UserId",
                table: "BillboardPost",
                column: "UserId");
        }
    }
}
