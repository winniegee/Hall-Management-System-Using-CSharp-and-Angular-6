using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Halls_HallId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_UserId",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Bookings",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "HallId",
                table: "Bookings",
                newName: "HallID");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                newName: "IX_Bookings_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_HallId",
                table: "Bookings",
                newName: "IX_Bookings_HallID");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "Bookings",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "HallID",
                table: "Bookings",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Halls_HallID",
                table: "Bookings",
                column: "HallID",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Halls_HallID",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_UserID",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Bookings",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "HallID",
                table: "Bookings",
                newName: "HallId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_UserID",
                table: "Bookings",
                newName: "IX_Bookings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_HallID",
                table: "Bookings",
                newName: "IX_Bookings_HallId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Bookings",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "HallId",
                table: "Bookings",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Halls_HallId",
                table: "Bookings",
                column: "HallId",
                principalTable: "Halls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_UserId",
                table: "Bookings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
