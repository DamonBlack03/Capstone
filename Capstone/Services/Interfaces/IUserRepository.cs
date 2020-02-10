using Capstone.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Services.Interfaces
{
    interface IUserRepository
    {
        public User GetUserById(int id);
        public User GetUserByUsername(string username);
        public void CreateUser(User user);
        public void RemoveUser(int id);
        public void UpdateUser(User user);
        public bool UserExists(int id);

    }
}
