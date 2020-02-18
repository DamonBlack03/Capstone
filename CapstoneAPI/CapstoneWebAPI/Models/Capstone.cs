using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneWebAPI.Models
{
    public class Capstone
    {
		public int CapstoneId { get; set; }
		public int UserId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int TotalMinutesWorked { get; set; }
		public int TotalMinutesBusy { get; set; }
		public int TotalMinutesSleep { get; set; }
		public int TotalMinutesFun { get; set; }
		public string MeetingDay { get; set; }
		public int HoursPerWeek { get; set; }
		public int DaysPerWeek { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public bool OnTrack { get; set; }
	}
}
