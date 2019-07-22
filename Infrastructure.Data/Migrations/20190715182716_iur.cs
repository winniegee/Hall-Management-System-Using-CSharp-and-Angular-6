using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class iur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Halls_Hallid",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_UserID",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Bookings",
                newName: "Userid");

            migrationBuilder.RenameColumn(
                name: "Hallid",
                table: "Bookings",
                newName: "HallID");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_UserID",
                table: "Bookings",
                newName: "IX_Bookings_Userid");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_Userid",
                table: "Bookings",
                column: "Userid",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Halls_HallID",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_Userid",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Userid",
                table: "Bookings",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "HallID",
                table: "Bookings",
                newName: "Hallid");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_Userid",
                table: "Bookings",
                newName: "IX_Bookings_UserID");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_UserID",
                table: "Bookings",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
