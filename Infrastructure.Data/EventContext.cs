using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace Infrastructure.Data
{
        public class EventContext : DbContext
        {
            public EventContext()
            {

            }
            public EventContext(DbContextOptions<EventContext> options) : base(options)
            {

            }
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Purpose> Purposes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                if (!optionsBuilder.IsConfigured)
                {
                    IConfigurationRoot configuration = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("Config.json")
                        .Build();
                    var connectionString = configuration.GetConnectionString("EventContext");
                    optionsBuilder.UseSqlServer(connectionString);
                optionsBuilder.EnableSensitiveDataLogging();
                }
            }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Role>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity <Location>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Purpose>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Hall>().Property(p => p.Id).ValueGeneratedOnAdd();
        }
    }
    }

