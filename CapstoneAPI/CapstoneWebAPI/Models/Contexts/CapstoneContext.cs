using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Models.Contexts
{
    public class CapstoneContext : DbContext
    {
        public CapstoneContext(DbContextOptions<CapstoneContext> options) : base(options)
        {
        }

        public DbSet<Capstone> Capstones { get; set; }
    }
}
