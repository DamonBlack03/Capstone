using CapstoneWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Interfaces
{
    interface IDayRepository
    {
        public Day GetDayById(int id);
        public List<Day> GetDaysByCapstoneId(int id);
        public void CreateDay(Day day);
        public void RemoveDay(int id);
        public void UpdateDay(Day day);
        public bool DayExists(int id);
    }
}
