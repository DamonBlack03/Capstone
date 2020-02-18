using CapstoneWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Services.Interfaces
{
    interface ICapstoneRepository
    {
        public Capstone GetCapstoneById(int id);
        public List<Capstone> GetCapstonesByUserId(int id);
        public void CreateCapstone(Capstone capstone);
        public void RemoveCapstone(int id);
        public void UpdateCapstone(Capstone capstone);
        public bool CapstoneExists(int id); 
    }
}
