using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Repositories
{
    public class DayRepository : IDayRepository
    {
        private readonly DayContext _context;

        public DayRepository(DayContext context)
        {
            _context = context;
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
            _context.Days.Remove(GetDayById(id));
        }

        public void UpdateDay(Day day)
        {
            throw new NotImplementedException();
        }
    }
}
