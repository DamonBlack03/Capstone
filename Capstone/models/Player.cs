using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.models
{
    public class Player
    {
        public Schedule Schedule { get; set; }
        public Capstone Capstone { get; set; }
        public int TimeAwakeInHours { get; set; }
    }
}
