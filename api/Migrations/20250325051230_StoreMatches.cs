using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class StoreMatches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Tutor_TutorId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_TutorId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "TutorId",
                table: "Student");

            migrationBuilder.CreateTable(
                name: "Match",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TutorId = table.Column<int>(type: "integer", nullable: false),
                    StudentId = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Match", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Match_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Match_Tutor_TutorId",
                        column: x => x.TutorId,
                        principalTable: "Tutor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Match_StudentId",
                table: "Match",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Match_TutorId",
                table: "Match",
                column: "TutorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Match");

            migrationBuilder.AddColumn<int>(
                name: "TutorId",
                table: "Student",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Student_TutorId",
                table: "Student",
                column: "TutorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Tutor_TutorId",
                table: "Student",
                column: "TutorId",
                principalTable: "Tutor",
                principalColumn: "Id");
        }
    }
}
