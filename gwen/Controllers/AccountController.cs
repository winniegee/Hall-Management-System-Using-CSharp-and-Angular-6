
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Data.HelperClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gwen.Controllers
{
    public class AccountController : Controller
    {
        // GET: /<controller>/
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> signInManager;
        //private readonly ILogger<AccountController> logger;
        // private readonly IConfiguration _config;
        private readonly AppSettings appSettings;
        public AccountController(SignInManager<User> signInManager, UserManager<User> _userManager, IOptions<AppSettings> appSettings)
        {
            //this.logger = logger;
            this.signInManager = signInManager;
            this._userManager = _userManager;
            this.appSettings = appSettings.Value;
            //this._config = _config;
        }
       // [Produces("application/json")]
        [Route("api/account/register")]
        [HttpPost]  
        public async Task<ActionResult> Register([FromBody]RegistrationVM model)
        {
            if (ModelState.IsValid)
            {
                
                var user = new User { UserName = model.Username, Email = model.Email };
                
                //var exists = _userManager.FindByEmailAsync(user.Email);
                //if (exists != null)
                //{
                //    ModelState.AddModelError("", "Email address already exists");
                //    return BadRequest(ModelState);
                //}
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    if (model.IsHallOwner)
                    {
                        await _userManager.AddToRoleAsync(user, "Hall Owner");
                    }
                    else if (model.IsUser)
                    {
                        await _userManager.AddToRoleAsync(user, "Users");
                    }
                    await signInManager.SignInAsync(user, isPersistent: false);
                    return Ok();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("api/account/login")]
        public async Task<User> Login([FromBody]LoginVM model)
        {
            if (ModelState.IsValid)
         {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return null;
                }
                var role = await _userManager.GetRolesAsync(user) ;
                var roles = role[0];
               //var rolename=role.Where(x=>role.Contains(x.Name))
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                    {
                        new Claim(ClaimTypes.Name,user.Email),
                        new Claim(ClaimTypes.Role, roles)
                    };
                var token=new JwtSecurityToken( 
                    expires: DateTime.UtcNow.AddMinutes(30),
                   signingCredentials: creds,
                   claims:claims  );
                //var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);
                //user.PasswordHash = null;
                UserRole usrrole = new UserRole();
                user.Roles = user.UserRole.Select(x=>x.Role.Name).FirstOrDefault() ;
                user.Roles = roles;
                return user;
            }
            return null;
        }
        //public IActionResult Login()
        //{
        //    if (this.User.Identity.IsAuthenticated)
        //    {
        //        return RedirectToAction("Home", "Home");
        //    }
        //    return Ok();
        //}
        //[httppost]
        //[route("api/account/login")]
        //[allowanonymous]
        //public async task<iactionresult> login(loginvm model)
        //{
        //    if (modelstate.isvalid)
        //    {
        //        var user = await _usermanager.findbyemailasync(model.email);
        //        if (user != null)
        //        {
        //            var result = await signinmanager.checkpasswordsigninasync(user, model.password, false);
        //            if (!result.succeeded)
        //            {
        //                return unauthorized();

        //            }
        //            var claims = new[]
        //            {
        //            new claim(jwtregisteredclaimnames.sub, model.email),
        //            new claim(jwtregisteredclaimnames.jti, guid.newguid().tostring())
        //            };
        //            var token = new jwtsecuritytoken(
        //                issuer: _config["token:issuer"],
        //                audience: _config["token:audience"],
        //                claims: claims,
        //                expires: datetime.utcnow,
        //                signingcredentials: new signingcredentials(new symmetricsecuritykey(encoding.utf8.getbytes(_config["token:key"])),
        //                securityalgorithms.hmacsha256)
        //                );
        //            return ok(new { token = new jwtsecuritytokenhandler().writetoken(token) });
        //        }
        //    }               
        //    return badrequest();
        //    }

        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }
        
        public void AddErrors(IdentityResult result)
        {
            foreach(var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        //private IActionResult RedirectToLocal(string returnUrl)
        //{
        //    if (Url.IsLocalUrl(returnUrl))
        //    {
        //        return Redirect(returnUrl);
        //    }
        //    else
        //    {
        //        return RedirectToAction(nameof(HomeController.Index))
        //    }
        //}
    }
}
