using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Model;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {

private Task findTask(int taskId) {
 return tasks.First(task => task.Id == taskId);
}
        static List<Task> tasks = new List<Task>();
        // GET api/values
        [HttpGet]
        public IEnumerable<Task> Get()
        {
            return tasks;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Task Get(int id)
        {
            return this.findTask(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Task value)
        {
            value.Id = tasks.Count;
            value.Added = DateTime.Now;
            tasks.Add(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Task value)
        {

            Task taskToUpdate = this.findTask(id);
            if (taskToUpdate == null) {
                return;
            }
            taskToUpdate.Title = value.Title;
            taskToUpdate.DueDate = value.DueDate;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Task taskToRemove = this.findTask(id);
            if (taskToRemove != null) {
                tasks.Remove(taskToRemove);
            }
        }
    }
}
