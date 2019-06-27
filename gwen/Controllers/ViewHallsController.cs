using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interface;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gwen.Controllers
{
    public class ViewHallsController : Controller
    {
        // GET: /<controller>/
        private readonly IUnitOfWork uow;
        //private readonly IService<Purpose> purposeService;
        //private readonly IService<Hall> hallService;
        public ViewHallsController(IUnitOfWork uow)
        {
            this.uow = uow;
        }
        // [HttpGet]
        //public ActionResult Index()
        //{
        //    HallViewModel vm = new HallViewModel();
        //    vm.Halls = uow.Halls.GetAll();
        //    return View(vm);
        //}

        // [HttpPost]
        //public PartialViewResult ViewHalls(string location, string purpose)
        //{
        //    //List<LocationPurposeVM> vm = new List<LocationPurposeVM>();
        //    //vm.Locations = locationService.GetAll().Where(t => t.Name == location);
        //    //vm.Purposes = purposeService.GetAll().Where(t => t.Name == purpose).ToList();
        //    var Halls = uow.Hallsz.FindBy(t => t.Purposes.Where(r => r.Name == purpose));
        //    var Hallss = Halls.Where(t => t.Locations == location);

        //    //ViewBag.location = (from r in vm.Halls
        //    //                    select r.Location).Distinct();
        //    //ViewBag.purpose = (from r in vm.Halls
        //    //                   select r.Purpose).Distinct();
        //    //var model = from r in vm.Select(t=>t.Halls)
        //    //            //orderby r.Select(t=>t.Name)
        //    //            where r.Select(t=>t.Location==location)!=null
        //    //            where r.Select(t => t.Purpose == location) != null
        //    //            select r;
        //    // vm.Add(model);
        //    //return PartialView(model.ToList());
        //    //var locationFilter = vm.Halls.Where(t => t.Location == location);
        //    //var purposeFilter = locationFilter.Where(t => t.Purpose == purpose).ToList();

        //    //return PartialView(purposeFilter.AsEnumerable());
        //    return PartialView(Hallss);
        //}

    }
}
