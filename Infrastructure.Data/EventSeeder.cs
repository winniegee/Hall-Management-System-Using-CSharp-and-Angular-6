using Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Infrastructure.Data;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Data
{
    public class EventSeeder
    {
        private readonly EventContext context;
        private readonly IHostingEnvironment _hosting;
        private readonly UserManager<User> userManager;
        private readonly IServiceProvider serviceProvider;


        public EventSeeder(EventContext ctx, IHostingEnvironment hosting, UserManager<User> userManager, IServiceProvider serviceProvider)
        {
            context = ctx;
            _hosting = hosting;
            this.userManager = userManager;
            this.serviceProvider = serviceProvider;
        }
        public async Task Seed()
        {
            context.Database.EnsureCreated();

            var role1 = new Role() { Name = "Administrator" };
            var role2 = new Role() { Name = "Users" };
            var role3 = new Role() { Name = "Hall Owner" };

            var adminRole = new UserRole() { Role = role1 };
            var usrmngr = serviceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<UserRole>>();
            //var userManager = serviceProvider.GetRequiredService<User>();
            string email = "admin@gmail.com";
            //Task<IdentityResult> roleResult;

           

            context.Set<Role>();

                context.Roles.AddOrUpdate(role1, x => x.Name);
                context.Roles.AddOrUpdate(role2, x => x.Name);
                context.Roles.AddOrUpdate(role3, x => x.Name);
            Task<User> admin = usrmngr.FindByEmailAsync(email);
            admin.Wait();
            if (admin.Result == null)
            {
                User administativeUser = new User();
                administativeUser.Email = email;
                administativeUser.UserName = "Ofure";
                administativeUser.FirstName = "Winifred";
                administativeUser.LastName = "Osezuah";
                Task<IdentityResult> newAdmin = usrmngr.CreateAsync(administativeUser, "Adminwinnie@5");
                newAdmin.Wait();
                Task<IdentityResult> newAdminn = usrmngr.AddToRoleAsync(administativeUser, role1.Name);
                newAdminn.Wait();
            }

            var location1 = new Location() { Name = "Lagos" };
                var location2 = new Location() { Name = "Abuja" };
                var location3 = new Location() { Name = "Benin" };
                var location4 = new Location() { Name = "Kaduna" };
                var location5 = new Location() { Name = "Port-Harcourt" };
                context.Set<Location>();

                context.Locations.AddOrUpdate(location1, x => x.Name);
                context.Locations.AddOrUpdate(location2, x => x.Name);
                context.Locations.AddOrUpdate(location3, x => x.Name);
                context.Locations.AddOrUpdate(location4, x => x.Name);
                context.Locations.AddOrUpdate(location5, x => x.Name);


                var purposes1 = new Purpose() { Name = "Coperate Meeting" };
                var purposes2 = new Purpose() { Name = "Outdoor gathering" };
                var purposes3 = new Purpose() { Name = "Conference" };
                var purposes4 = new Purpose() { Name = "Awards Ceremony" };
                var purposes5 = new Purpose() { Name = "Dinner Party" };
                var purposes6 = new Purpose() { Name = "Wedding Ceremony" };

                context.Set<Purpose>();

                context.Purposes.AddOrUpdate(purposes1, x => x.Name);
                context.Purposes.AddOrUpdate(purposes2, x => x.Name);
                context.Purposes.AddOrUpdate(purposes3, x => x.Name);
                context.Purposes.AddOrUpdate(purposes4, x => x.Name);
                context.Purposes.AddOrUpdate(purposes5, x => x.Name);
                context.Purposes.AddOrUpdate(purposes6, x => x.Name);
                //List<Hall> Halls = new List<Hall>
                //{
                var hall1 = new Hall()
                {
                    Name = "Sephora Halls",
                    Description = "Sephora Halls, the best in Abuja, very affordable. Has: Standby generators(2), security, good restrooms, well air-conditioned",
                    Locations = location5,
                    LocationName=location5.Name,
                    Price = 20000,
                    Purposes = new List<Purpose> { purposes2, purposes3 },
                    Image = "/content/Ballroom.jpg"

                };

                var hall2 = new Hall()
                {
                    Name = "Asakun Event Centre",
                    Description = "We offer the following exquisite services:A Standby generators, security guards, good restrooms, well air-conditioned rooms ",
                    Locations = location2,
                    LocationName = location2.Name,
                    Price = 15000,
                    Purposes = new List<Purpose> { purposes3, purposes5, purposes6 },
                    Image = "/content/Ballroom.jpg"
                };
                var hall3 = new Hall()
                {
                    Name = "Adelefun Hotel",
                    Description = "Our hall, found at the top floor of this 5-star hotel, is world-class. It is: very affordable, has Standby generators(2), security, good restrooms, well air-conditioned, elevator from the ground floor",
                    Locations = location4,
                    LocationName = location4.Name,
                    Price = 25000,
                    Purposes = new List<Purpose> { purposes4, purposes1, purposes5 },
                    Image = "/content/GoldenHall.jpg"
                };
                var hall4 = new Hall()
                {
                    Name = "Lesley Events",
                    Description = "Award winning event centre, very affordable. Has: Standby generators(2), security, good restrooms, well air-conditioned",
                    Locations = location1,
                    LocationName = location1.Name,
                    Price = 35000,
                    Purposes = new List<Purpose> { purposes2, purposes5, purposes6 },
                    Image = "/content/hall-ok.jpg"
                };
                var hall5 = new Hall()
                {
                    Name = "Crowny Events",
                    Description = "Award winning event centre, very affordable. Has: Standby generators(2), security, good restrooms, well air-conditioned",
                    Locations = location1,
                    LocationName = location1.Name,
                    Price = 350000,
                    Purposes = new List<Purpose> { purposes2, purposes6, purposes3 },
                    Image = "/content/GoldenHall.jpg"
                };
                context.Set<Hall>();



                context.Halls.AddOrUpdate(hall1, x => x.Name);
                context.Halls.AddOrUpdate(hall2, x => x.Name);
                context.Halls.AddOrUpdate(hall3, x => x.Name);
                context.Halls.AddOrUpdate(hall4, x => x.Name);
                context.Halls.AddOrUpdate(hall5, x => x.Name);
                context.SaveChanges();

            }

        }
    }
