using CapstoneWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Interfaces
{
    interface IUserRepository
    {
        public User GetUserById(int id);
        public User GetUserByEmail(string email);
        public void CreateUser(User user);
        public void RemoveUser(int id);
        public void UpdateUser(User user);
        public bool UserExists(int id);
        public bool UserExists(string email);
    }
}
