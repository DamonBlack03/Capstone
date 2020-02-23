using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CapstoneWebAPI.Services.Repositories
{
    public class DayRepository : IDayRepository
    {
        private readonly DayContext _context;
        public TaskRepository taskRepository { get; set; }

        public DayRepository(DayContext context, TaskContext taskContext)
        {
            _context = context;
            taskRepository = new TaskRepository(taskContext);
        }

        public void CreateDay(Day day)
        {
            _context.Days.Add(day);
        }

        public bool DayExists(int id)
        {
            return _context.Days.Any(d => d.DayId == id);
        }

        public Day GetDayById(int id)
        {
            return _context.Days.SingleOrDefault(d => d.DayId == id);
        }

        public List<Day> GetDaysByCapstoneId(int id)
        {
            return _context.Days.Where(d => d.CapstoneId == id).ToList();
        }

        public void RemoveDay(int id)
        {
            Day day = GetDayById(id);

            List<Task> tasks = taskRepository.GetTasksByDayId(id);

            foreach (Task task in tasks)
            {
                taskRepository.RemoveTask(task.TaskId);
            }

            _context.Days.Remove(day);
            _context.SaveChanges();
        }

        public void UpdateDay(Day day)
        {
            throw new NotImplementedException();
        }
    }
}
