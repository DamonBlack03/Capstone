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
            Day day = _context.Days.SingleOrDefault(d => d.DayId == id);

            UpdateDay(day);

            return day;
        }

        public List<Day> GetDaysByCapstoneId(int id)
        {
            List<Day> days = _context.Days.Where(d => d.CapstoneId == id).ToList();

            days.ForEach(d => UpdateDay(d));

            return days;
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
            List<Task> tasks = taskRepository.GetTasksByDayId(day.DayId);
            int minutesW = 0;
            int minutesB = 0;
            int minutesS = 0;
            int minutesF = 0;
            tasks.ForEach(t => {
                switch (t.Category)
                {
                    case "Work":
                        minutesW += t.Minutes;
                        break;
                    case "Busy":
                        minutesB += t.Minutes;
                        break;
                    case "Sleep":
                        minutesS += t.Minutes;
                        break;
                    default:
                        minutesF += t.Minutes;
                        break;
                }
            });

            day.TotalMinutesBusy = minutesB;
            day.TotalMinutesFun = minutesF;
            day.TotalMinutesSleep = minutesS;
            day.TotalMinutesWorked = minutesW;

            _context.Update(day);
            _context.SaveChanges();

        }
        public void UpdateDay(int dayId)
        {
            Day day = GetDayById(dayId);
            List<Task> tasks = taskRepository.GetTasksByDayId(day.DayId);
            int minutesW = 0;
            int minutesB = 0;
            int minutesS = 0;
            int minutesF = 0;
            tasks.ForEach(t => {
                switch (t.Category)
                {
                    case "Work":
                        minutesW += t.Minutes;
                        break;
                    case "Busy":
                        minutesB += t.Minutes;
                        break;
                    case "Sleep":
                        minutesS += t.Minutes;
                        break;
                    default:
                        minutesF += t.Minutes;
                        break;
                }
            });

            day.TotalMinutesBusy = minutesB;
            day.TotalMinutesFun = minutesF;
            day.TotalMinutesSleep = minutesS;
            day.TotalMinutesWorked = minutesW;
            day.Successful = (day.TotalMinutesBusy >= 180) ? true : false;
            

            _context.Update(day);
            _context.SaveChanges();
        }
    }
}
