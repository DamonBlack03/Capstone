using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;
        public CapstoneRepository capstoneRepository { get; set; }
        public DayRepository dayRepository { get; set; }
        public TaskRepository taskRepository { get; set; }

        public UserRepository(UserContext userContext, CapstoneContext capstoneContext, DayContext dayContext, TaskContext taskContext)
        {
            _context = userContext;
            capstoneRepository = new CapstoneRepository(capstoneContext, dayContext, taskContext);
            dayRepository = new DayRepository(dayContext, taskContext);
            taskRepository = new TaskRepository(taskContext);
        }

        public void CreateUser(User user)
        {
            _context.Users.Add(user);
        }

        public User GetUserById(int id)
        {
            return _context.Users.SingleOrDefault(us => us.UserId == id);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.SingleOrDefault(us => us.Email.Equals(email));
        }

        public void RemoveUser(int id)
        {
            User user = _context.Users.SingleOrDefault(us => us.UserId == id);

            List<Capstone> capstones = capstoneRepository.GetCapstonesByUserId(id);

            foreach (Capstone capstone in capstones)
            {
                capstoneRepository.RemoveCapstone(capstone.CapstoneId);
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

        }

        public void UpdateUser(User user)
        {
            //dont need
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
        public bool UserExists(string email)
        {
            return _context.Users.Any(e => e.Email == email);
        }
    }
}
