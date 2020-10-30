using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LocalUndergroundServer.Migrations
{
    public partial class remove_onbuild : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PanelImage");

            migrationBuilder.DropTable(
                name: "PanelCore");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "BillboardCore");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "BillboardCore",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "BillboardCore",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "BillboardCore",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "BillboardCore",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "BillboardCore",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "BillboardCore",
                maxLength: 255,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BillboardImage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Size = table.Column<long>(nullable: false),
                    ImageData = table.Column<byte[]>(nullable: true),
                    BillboardId = table.Column<int>(nullable: false),
                    BillboardCoreId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillboardImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillboardImage_BillboardCore_BillboardCoreId",
                        column: x => x.BillboardCoreId,
                        principalTable: "BillboardCore",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillboardImage_BillboardCoreId",
                table: "BillboardImage",
                column: "BillboardCoreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillboardImage");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "BillboardCore");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "BillboardCore");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "BillboardCore");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "BillboardCore");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "BillboardCore");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "BillboardCore",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "BillboardCore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PanelCore",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillboardId = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanelId = table.Column<int>(type: "int", nullable: false)
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
    }
}
