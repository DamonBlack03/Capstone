using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext userContext)
        {
            _context = userContext;
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
            _context.Users.Remove(user);
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
