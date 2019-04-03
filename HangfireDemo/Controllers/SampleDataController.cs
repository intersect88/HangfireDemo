using HangfireDemo.Models;
using Microsoft.AspNetCore.Mvc;

namespace HangfireDemo.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        public static Counter counter = new Counter();

        [HttpGet("[action]")]
        public int GetIncrementedCounter()
        {
            return counter.Value ;
        }

        [HttpPut]
        [Route("[action]")]
        public void SendCurrentCounter([FromBody] Counter currentCounter)
        {
            counter.Value = currentCounter.Value;
            counter.Value++;
        }
    }
}
