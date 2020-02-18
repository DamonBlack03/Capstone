using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Models.Contexts
{
    public class DayContext : DbContext
    {
        public DayContext(DbContextOptions<DayContext> options) : base(options)
        {
        }

        public DbSet<Day> Days { get; set; }
    }
}
