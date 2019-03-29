using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HangfireDemo.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        public int counter;

        [HttpGet("[action]")]
        public int IncrementCounter()
        {
            var temp = this.counter;
            temp++;
            this.counter = temp;
            return this.counter;
        }
    }
}
