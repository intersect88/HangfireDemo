using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HangfireDemo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HangfireDemo.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        public static Counter c = new Counter();

        [HttpGet("[action]")]
        public int GetCounter()
        {
            return c.Value ;
        }

        // POST api/values
        [HttpPut]
        [Route("counter")]
        public Counter Put([FromBody] Counter cou)
        {
            c.Value = cou.Value;
            c.Value++;
            return c;
        }
    }
}
