
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


namespace gwen.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> signInManager;
        private readonly AppSettings appSettings;
        public AccountController(SignInManager<User> signInManager, UserManager<User> _userManager, IOptions<AppSettings> appSettings)
        {
            this.signInManager = signInManager;
            this._userManager = _userManager;
            this.appSettings = appSettings.Value;
        }
       // [Produces("application/json")]
        [Route("api/account/register")]
        [HttpPost]  
        public async Task<ActionResult> Register([FromBody]RegistrationVM model)
        {
            if (ModelState.IsValid)
            {
                
                var user = new User { UserName = model.Username, Email = model.Email };
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
                user.Token = tokenHandler.WriteToken(token);
                //user.PasswordHash = null;
                UserRole usrrole = new UserRole();
                user.Roles = user.UserRole.Select(x=>x.Role.Name).FirstOrDefault() ;
                user.Roles = roles;
                return user;
            }
            return null;
        }
        
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
    }
}
