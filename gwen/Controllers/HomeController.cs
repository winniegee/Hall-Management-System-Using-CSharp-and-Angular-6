using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gwen.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        //private readonly EventContext _ctx;
        //public HomeController(EventContext ctx)
        //{
        //    _ctx = ctx;
        //}

        public IActionResult Home()
        {
            return View();
            //var results = _ctx.Halls.ToList();
            //return Ok(results);
        }
    }
}
