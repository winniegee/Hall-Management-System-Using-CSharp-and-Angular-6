using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class iu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Halls_HallID",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "HallID",
                table: "Bookings",
                newName: "Hallid");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_HallID",
                table: "Bookings",
                newName: "IX_Bookings_Hallid");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Halls_Hallid",
                table: "Bookings",
                column: "Hallid",
                principalTable: "Halls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Halls_Hallid",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Hallid",
                table: "Bookings",
                newName: "HallID");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_Hallid",
                table: "Bookings",
                newName: "IX_Bookings_HallID");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Halls_HallID",
                table: "Bookings",
                column: "HallID",
                principalTable: "Halls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
