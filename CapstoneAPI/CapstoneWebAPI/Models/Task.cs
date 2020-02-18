using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Models
{
    public class Task
    {
		public int TaskId { get; set; }
		public int DayId { get; set; }
		public string Category { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public int Minutes { get; set; }
		public bool InProgress { get; set; }
	}
}
