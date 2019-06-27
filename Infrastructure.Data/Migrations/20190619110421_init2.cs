using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Bookings_BookingID",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_BookingID",
                table: "Halls");

            migrationBuilder.DropColumn(
                name: "BookingID",
                table: "Halls");

            migrationBuilder.AddColumn<int>(
                name: "BookingsId",
                table: "Halls",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Halls_BookingsId",
                table: "Halls",
                column: "BookingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Bookings_BookingsId",
                table: "Halls",
                column: "BookingsId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Halls_Bookings_BookingsId",
                table: "Halls");

            migrationBuilder.DropIndex(
                name: "IX_Halls_BookingsId",
                table: "Halls");

            migrationBuilder.DropColumn(
                name: "BookingsId",
                table: "Halls");

            migrationBuilder.AddColumn<int>(
                name: "BookingID",
                table: "Halls",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Halls_BookingID",
                table: "Halls",
                column: "BookingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Halls_Bookings_BookingID",
                table: "Halls",
                column: "BookingID",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
