using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CSharpCharts.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSharpCharts.Controllers
{
    public class MainController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Data(string plotName = "plotxy")
        {
            string text = await System.IO.File.ReadAllTextAsync($"wwwroot/json/{plotName}.json");
            var plot = JsonConvert.DeserializeObject<Plot>(text);
            return Json(new { label = plot.label, data = plot.ToPoints()});
        }
    }
}
