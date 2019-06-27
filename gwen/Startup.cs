using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interface;
using Infrastructure.Data;
using Infrastructure.Data.HelperClasses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Service;
using Service.Interface;

namespace gwen
{
    public class Startup
    {
        public readonly IConfiguration _config;
        public readonly UserManager<User> usrmngr;
        public Startup(IConfiguration config)
        {
            _config = config;
            //this.usrmngr =usrmngr;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940 
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyHeader()
                    .WithOrigins("http://localhost:4200")
                        //builder => builder.AllowAnyOrigin()
                        .WithMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS")
                        .AllowCredentials());
            });
            //services.Configure<MvcOptions>(options =>
            //{
            //    options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
            //});>
            //services.AddTransient<IRoleStore<IdentityRole>>();
            services.AddTransient<IUserStore<User>, UserStore>();
            services.AddTransient<IRoleStore<UserRole>, RoleStore>();
            services.AddDbContext<EventContext>(cfg =>
            {
                cfg.UseSqlServer(_config.GetConnectionString("EventContext")).EnableSensitiveDataLogging();
            });

            services.AddIdentity<User, IdentityRole>(cfg =>
            {
                cfg.User.RequireUniqueEmail = false;
            }).AddUserStore<UserStore>()
            .AddRoleStore<RoleStore>()
            .AddUserManager<UserManager<User>>()
            .AddDefaultTokenProviders();

            services.AddTransient<RoleManager<UserRole>>();
            services.AddScoped<EventSeeder>();
            //services.AddScoped<UserManager<User>>();
            //services.AddScoped<RoleManager<IdentityRole>>();
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient(typeof(IService<>), typeof(HallServices<>));
            services.AddTransient(typeof(IUnitOfWork), typeof(UnitOfWork));

            services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);
            services.Configure<MvcOptions>(options =>
            options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy")));
            var appSettingsSection = _config.GetSection("appSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider, UserManager<User> usrmngr)
        {
            app.UseCors("CorsPolicy");

            //app.UseCorsMiddleWare();

            //app.UseCors("CorsPolicy");
            app.Use(async (context, next) =>
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:4200";
                await next();
                if (context.Response.StatusCode == 404 &&
                !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });
            if (env.IsDevelopment())
            {


                app.UseDeveloperExceptionPage();
                app.UseHttpsRedirection();
                // app.UseAuthentication();
                app.UseMvc(cfg =>
                {
                    cfg.MapRoute("Default",
                        "{controller}/{action}/{id?}",
                        new { controller = "Home", Action = "Home" });

                });
                app.UseAuthentication();
                app.UseMvcWithDefaultRoute();
                app.UseDefaultFiles();
                app.UseStaticFiles();
                //app.UseStaticFiles(new StaticFileOptions()
                //{
                //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                //    RequestPath = new PathString("/Resources")
                //});
                app.UseNodeModules(env);
                // CreateRoles(serviceProvider);
            }
        }

        //    private void CreateRoles(IServiceProvider serviceProvider)//, UserManager<User> usrmngr)
        //    {
        //        var usrmngr = serviceProvider.GetRequiredService<UserManager<User>>();
        //        var roleManager = serviceProvider.GetRequiredService<RoleManager<UserRole>>();
        //        //var userManager = serviceProvider.GetRequiredService<User>();
        //        string email = "admin@gmail.com";
        //        Task<IdentityResult> roleResult;
        //        Task<bool> hasAdminRole = roleManager.RoleExistsAsync("Administrator");
        //        hasAdminRole.Wait();
        //        if (!hasAdminRole.Result)
        //        {
        //            roleResult = roleManager.CreateAsync("Administrator"));
        //            roleResult.Wait();
        //        }
        //        Task<User> admin = usrmngr.FindByEmailAsync(email);
        //        admin.Wait();
        //        if (admin.Result == null)
        //        {
        //            User administator = new User();
        //            administator.Email = email;
        //            administator.UserName = "Ofure";
        //            Task<IdentityResult> newAdmin = usrmngr.CreateAsync(administator, "Adminwinnie@5");
        //            newAdmin.Wait();
        //            Task<IdentityResult> newAdminn = usrmngr.AddToRoleAsync(administator, "Administrator");
        //            newAdminn.Wait();
        //        }
        //        Task<bool> hasUserRole = roleManager.RoleExistsAsync("Users");
        //        hasUserRole.Wait();
        //        if (!hasUserRole.Result)
        //        {
        //            roleResult = roleManager.CreateAsync(new IdentityRole("Users"));
        //            roleResult.Wait();
        //        }
        //        Task<bool> hasHORole = roleManager.RoleExistsAsync("Hall Owner");
        //        hasHORole.Wait();
        //        if (!hasHORole.Result)
        //        {
        //            roleResult = roleManager.CreateAsync(new IdentityRole("Hall Owner"));
        //            roleResult.Wait();
        //        }
        //    }
        //}
    }
}