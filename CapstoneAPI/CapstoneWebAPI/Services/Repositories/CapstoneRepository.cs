using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Repositories
{
    public class CapstoneRepository : ICapstoneRepository
    {
        private readonly CapstoneContext _context;
        public DayRepository dayRepository { get; set; }
        public TaskRepository taskRepository { get; set; }

        public CapstoneRepository(CapstoneContext context, DayContext dayContext, TaskContext taskContext)
        {
            _context = context;
            dayRepository = new DayRepository(dayContext, taskContext);
            taskRepository = new TaskRepository(taskContext);
        }

        public bool CapstoneExists(int id)
        {
            return _context.Capstones.Any(c => c.CapstoneId == id);
        }

        public bool CapstoneExists(string name)
        {
            return _context.Capstones.Any(c => c.Name.Equals(name));
        }

        public void CreateCapstone(Capstone capstone)
        {
            _context.Capstones.Add(capstone);
        }

        public Capstone GetCapstoneById(int id)
        {
            return _context.Capstones.SingleOrDefault(c => c.CapstoneId == id);
        }

        public List<Capstone> GetCapstonesByUserId(int id)
        {
            return _context.Capstones.Where(c => c.UserId == id).ToList();
        }

        public void RemoveCapstone(int id)
        {
            Capstone capstone = GetCapstoneById(id);

            List<Day> days = dayRepository.GetDaysByCapstoneId(id);

            foreach (Day day in days)
            {
                dayRepository.RemoveDay(day.DayId);
            }

            _context.Capstones.Remove(capstone);
            _context.SaveChanges();
        }

        public void UpdateCapstone(Capstone capstone)
        {
            throw new NotImplementedException();
        }
    }
}
