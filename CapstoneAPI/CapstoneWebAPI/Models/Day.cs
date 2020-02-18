using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Models
{
    public class Day
    {
		public int DayId { get; set; }
		public int CapstoneId { get; set; }
		public int DayNumber { get; set; }
		public DateTime Date { get; set; }
		public int TotalMinutesWorked { get; set; }
		public int TotalMinutesBusy { get; set; }
		public int TotalMinutesSleep { get; set; }
		public int TotalMinutesFun { get; set; }
		public bool Successful { get; set; }
	}
}
