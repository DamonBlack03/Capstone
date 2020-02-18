using CapstoneWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CapstoneWebAPI.Services.Interfaces
{
    interface ITaskRepository
    {
        public Task GetTaskById(int id);
        public List<Task> GetTasksByDayId(int id);
        public void CreateTask(Task task);
        public void RemoveTask(int id);
        public void UpdateTask(Task task);
        public bool TaskExists(int id);
    }
}
