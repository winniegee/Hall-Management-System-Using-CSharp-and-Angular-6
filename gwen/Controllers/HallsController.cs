using Domain.Entities;
using Domain.Interface;
using Infrastructure.Data;
using Infrastructure.Data.Managers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gwen.Controllers
{
    // GET: /<controller>/
    public class LocationClass
    {
        public string Location { get; set; }
        public string[] Purpose { get; set; }
    }
    public class PurposeClass
    {
       
    }
    public class HallsController : Controller
    {
        private readonly IUnitOfWork uow;
       // private readonly IHallRepository repo;
        private IHostingEnvironment hostingEnvironment;
        // private Hallmanager hallmanager;
        public HallsController(IUnitOfWork uow, IHostingEnvironment hostingEnvironment)
        {
            this.uow = uow;
            this.hostingEnvironment = hostingEnvironment;
           // this.repo = repo;
        }

        
        [Route("api/halls/filterByLocation")]
        //[HttpPost]
        //[HttpOptions]
        //public IEnumerable<Hall> FilterByLocationAndPurpose([FromBody]LocationClass location)
        //{
        //    if (location.Location != null && location.Purpose == null)
        //    {
        //        var c = uow.Halls.GetAll().Where(x => x.Locations.Name == location.Location).ToArray();
        //        return c;
        //    }
        //    else if (location.Location == null && location.Purpose != null)
        //    {
        //        var z = uow.Halls.GetAll().Where(x => x.Purposes.Select(y => y.Name).ToString() == location.Purpose);
        //        return z;
        //    }
        //    else if (location.Location != null && location.Purpose != null)
        //    {
        //        var c = uow.Halls.GetAll().Where(x => x.Locations.Name== location.Location).ToArray();
        //        var z = c.Where(x => x.Purposes.Select(y => y.Name).ToString() == location.Purpose);
        //        return z;
        //    }
        //    return null;
        //}

        [HttpGet]
        [HttpOptions]
       // [EnableCors("CorsPolicy")]
        
        [Route("api/halls/get")]
        public ActionResult<IEnumerable<Hall>> GetHalls()
            {
                try
                {
                  return Ok(uow.Halls.GetAll());
                //return View();
                }
                catch (Exception ex)
                {
                    return BadRequest("Failed to get halls");
                }
            }
        [HttpPost]
        [Route("api/halls/FindLocationByID")]
        public string FindLocationByID(int ID)
        {
            var location=uow.Locations.Get(ID);
            return location.Name;
        }

        [Route("api/halls/getPur")]
        public ActionResult<IEnumerable<Hall>> GetPurposes()
        {
            try
            {
                return Ok(uow.Purposes.GetAll());
                //return View();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to get purposes");
            }
        }


        [Route("api/halls/getLoc")]
        public ActionResult<IEnumerable<Location>> GetLocations()
        {
            try
            {
                return Ok(uow.Locations.GetAll());
                //return View();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to get locations");
            }
        }
        [Route("api/halls/createHall")]
        [HttpPost]
        public ActionResult CreateHall([FromBody]HallViewModel model)
        {
           // model.Purpose=m
            var hallmanager = new Hallmanager(uow);
            hallmanager.CreateHall(model);
            return Ok();
        }

        [Route("api/halls/getHallById")]
        [HttpGet]
        public Hall GetHallById(int ID)
        {
            return uow.Halls.Get(ID);
        }

        [Route("api/upload")]
        [HttpPost]
        public ActionResult UploadFile() { 
        
                var file = Request.Form.Files[0];
                string webRootPath = hostingEnvironment.WebRootPath;
            string newPath = "~/content/uploads";
                if (!Directory.Exists(newPath))
                
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //string fullPath = Path.Combine(newPath, fileName);
                string fullPath = newPath + "/" + fileName;
                    //string fullpathh = fullPath.Replace("C:\\fakepath\\", "");
                    using (var stream=new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                
                    return Ok(new { fullPath });
                }


            return BadRequest();
            }
       
        [Route("api/halls/FindLocationByName")]
        [HttpPost]
        public Location FindLocationByName([FromBody]LocationClass Location)
        {
            return uow.Locations.FindByName(Location.Location);
        }

        [Route("api/halls/FindPurposeByName")]
        [HttpPost]
        public List<Purpose> FindPurposeByName([FromBody] LocationClass Purpose)
        {
            List<Purpose> result = new List<Purpose>();
            foreach (var name in Purpose.Purpose)
            {
                var resultt = uow.Purposes.FindByName(name);
                result.Add(resultt);
            }
            return result;
        }
    }
}
    
    

