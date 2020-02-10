using Capstone.models;
using Capstone.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Services.Repositories
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
            return _context.Users.FirstOrDefault(us => us.Id == id);
        }

        public User GetUserByUsername(string username)
        {
            return _context.Users.FirstOrDefault(us => us.Username.Equals(username));
        }

        public void RemoveUser(int id)
        {
            User user = _context.Users.FirstOrDefault(us => us.Id == id);
            _context.Users.Remove(user);
        }

        public void UpdateUser(User user)
        {
            //dont need
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
