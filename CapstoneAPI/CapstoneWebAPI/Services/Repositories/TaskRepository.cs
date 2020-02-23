using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CapstoneWebAPI.Services.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskContext _context;

        public TaskRepository(TaskContext context)
        {
            _context = context;
        }

        public void CreateTask(Task task)
        {
            _context.Tasks.Add(task);
        }

        public Task GetTaskById(int id)
        {
            return _context.Tasks.SingleOrDefault(t => t.TaskId == id);
        }

        public List<Task> GetTaskByCategory(string category)
        {
            return _context.Tasks.Where(t => t.Category == category).ToList();
        }

        public List<Task> GetTasksByDayId(int id)
        {
            return _context.Tasks.Where(t => t.DayId == id).ToList();
        }

        public void RemoveTask(int id)
        {
            _context.Tasks.Remove(GetTaskById(id));
            _context.SaveChanges();
        }

        public bool TaskExists(int id)
        {
            return _context.Tasks.Any(t => t.TaskId == id);
        }

        public void UpdateTask(Task task)
        {
            throw new NotImplementedException();
        }
    }
}
