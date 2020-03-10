using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using CapstoneWebAPI.Models;
using CapstoneWebAPI.Models.Contexts;
using CapstoneWebAPI.Models.Helpers;
using CapstoneWebAPI.Services.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CapstoneWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class UserController : ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly CapstoneContext _capstoneContext;
        private readonly DayContext _dayContext;
        private readonly TaskContext _taskContext;
        private readonly IConfiguration _configuration;
        public UserRepository userRepository { get; set; }
        public CapstoneRepository capstoneRepository { get; set; }
        public DayRepository dayRepository { get; set; }
        public TaskRepository taskRepository { get; set; }

        public UserController(UserContext userContext, CapstoneContext capstoneContext, DayContext dayContext, TaskContext taskContext, IConfiguration configuration)
        {
            _userContext = userContext;
            _capstoneContext = capstoneContext;
            _dayContext = dayContext;
            _taskContext = taskContext;

            _configuration = configuration;

            userRepository = new UserRepository(_userContext, _capstoneContext, _dayContext, _taskContext);
            capstoneRepository = new CapstoneRepository(_capstoneContext, _dayContext, _taskContext);
            dayRepository = new DayRepository(_dayContext, _taskContext);
            taskRepository = new TaskRepository(_taskContext);
        }


        #region Login
        [HttpPost]
        [Route("login")]
        public ActionResult Login(User credentials)
        {
            if (!AccountExists(credentials.Email))
            {
                return BadRequest("User does not exist");
            }

            var account = userRepository.GetUserByEmail(credentials.Email);

            if (!account.Password.Equals(credentials.Password))
            {
                return BadRequest("Password does not match");
            }

            var token = CreateToken(account);
            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token), user = account });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public ActionResult Register([FromBody, Required]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (AccountExists(user.Email))
            {
                return BadRequest("Email Exists");
            }

            if (!AuthenticationHelper.IsValidPassword(user.Password))
            {
                return BadRequest("Not a valid Password");
            }

            User account = new User()
            {
                Email = user.Email,
                Username = user.Username,
                Password = user.Password
            };

            var token = CreateToken(account);

            userRepository.CreateUser(account);
            _userContext.SaveChanges();

            AuthenticationHelper.SendWelcomeEmail(user.Email);


            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token), user = account });
        }

        private bool AccountExists(string email)
        {
            return userRepository.UserExists(email);
        }


        private bool AccountExists(int id)
        {
            return userRepository.UserExists(id);
        }

        private JwtSecurityToken CreateToken(User user)
        {
            return new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Issuer"],
                    claims: new Claim[] {
                        new Claim(JwtRegisteredClaimNames.Sub,user.UserId.ToString())
                    },
                    expires: DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["Jwt:ExpirationInHours"])),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])), SecurityAlgorithms.HmacSha256)
                );
        }

        #endregion

        #region User CRUD

        [HttpGet, Authorize]
        public JsonResult GetUsers()
        {
            return new JsonResult(_userContext.Users);
        }

        [HttpGet("{id:int}", Name = "GetUserById"), Authorize]
        public ActionResult GetUserById([Required] int id)
        {
            User user = userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { status = 200, user });
        }

        [HttpGet("{email}"), Authorize]
        public ActionResult GetUserByEmail([Required] string email)
        {
            User user = userRepository.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { status = 200, user });
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult PutUser([Required] int id, [FromBody, Required] User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _userContext.Entry(user).State = EntityState.Modified;

            try
            {
                _userContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userRepository.UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return CreatedAtRoute("GetUserById", new { id = user.UserId }, user);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeleteUser([Required] int id)
        {
            if (!UserExists(id))
            {
                return NotFound();
            }

            userRepository.RemoveUser(id);
            //_userContext.SaveChanges();

            return NoContent();
        }
        private bool UserExists(int id)
        {
            return userRepository.UserExists(id);
        }

        #endregion

        #region Capstone CRUD

        private bool CapstoneExists(int id)
        {
            return capstoneRepository.CapstoneExists(id);
        }

        private bool CapstoneExists(string name)
        {
            return capstoneRepository.CapstoneExists(name);
        }

        [HttpPost("{UserId}/Capstone"), Authorize]
        public ActionResult CreateCapstone([Required, FromBody] Capstone capstone, [Required] int UserId)
        {
            if (capstone == null)
            {
                return BadRequest("Capstone is null");
            }

            if (CapstoneExists(UserId) && capstone.UserId == UserId)
            {
                return BadRequest("Capstone by this name already exists for this user");
            }

            capstoneRepository.CreateCapstone(capstone);
            _capstoneContext.SaveChanges();

            return Ok(new { Capstone = capstone });
        }

        [HttpGet("{UsesrId}/Capstone/{capstoneId}", Name = "GetCapstoneById"), Authorize]
        public ActionResult GetCapstoneById([Required]int capstoneId)
        {
            Models.Capstone capstone = capstoneRepository.GetCapstoneById(capstoneId);

            if (capstone == null)
            {
                return NotFound();
            }

            return Ok(new { status = 200, capstone });
        }

        [HttpGet("{UserId}/Capstones"), Authorize]
        public ActionResult GetCapstonesByUserId([Required] int UserId)
        {
            List<Capstone> capstones = capstoneRepository.GetCapstonesByUserId(UserId);
            if (capstones.Count == 0)
            {
                return BadRequest("No Capstones for this user");
            }

            Capstone capstone = capstones[0];
            capstoneRepository.UpdateCapstone(capstone);

            List<Day> days;

           
            days = dayRepository.GetDaysByCapstoneId(capstone.CapstoneId);
           

            return Ok(new { status = 200, capstone/*, days*/});
        }

        [HttpDelete("{UserId}/Capstone/{capstoneId}"), Authorize]
        public ActionResult DeleteCapstone([Required] int capstoneId)
        {
            if (!CapstoneExists(capstoneId))
            {
                return BadRequest("Capstone with this id does not exist");
            }

            capstoneRepository.RemoveCapstone(capstoneId);
            _capstoneContext.SaveChanges();

            return NoContent();
        }

        [HttpPut("{UserId}/Capstone/{capstoneId}")]
        [Authorize]
        public ActionResult PutCapstone([Required] int UserId, [Required] int capstoneId, [FromBody, Required] Capstone capstone)
        {
            if (capstoneId != capstone.CapstoneId)
            {
                return BadRequest();
            }

            _capstoneContext.Entry(capstone).State = EntityState.Modified;

            try
            {
                _capstoneContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!capstoneRepository.CapstoneExists(capstoneId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return Ok();
        }

        #endregion

        #region Day CRUD

        private bool DayExists(int id)
        {
            return dayRepository.DayExists(id);
        }

        [HttpPost("Capstone/{capstoneId}/Day"), Authorize]
        public ActionResult CreateDay([Required, FromBody] Day day, [Required] int capstoneId)
        {
            if (day == null)
            {
                return BadRequest();
            }

            if (day.CapstoneId != capstoneId)
            {
                return BadRequest();
            }

            dayRepository.CreateDay(day);
            _dayContext.SaveChanges();
            capstoneRepository.UpdateCapstone(capstoneId);
            return Ok();
        }
        
        [HttpGet("Capstone/{capstoneId}/Day/{dayId}"), Authorize]
        public ActionResult GetDayById([Required] int dayId)
        {
            if (!DayExists(dayId))
            {
                return BadRequest("Day does not exist");
            }
            Day day = dayRepository.GetDayById(dayId);



            return Ok(new { status = 200, day });
        }

        [HttpGet("Capstone/{capstoneId}/Days"), Authorize]
        public ActionResult GetDaysByCapstoneId([Required] int capstoneId)
        {
            if (!CapstoneExists(capstoneId))
            {
                return BadRequest("Capstone with this Id does not exist");
            }

            List<Day> days = dayRepository.GetDaysByCapstoneId(capstoneId);

            if (days.Count < 1)
            {
                return NotFound("No days found for this Capstone");
            }
            List<List<Task>> tasks = new List<List<Task>>();// = GetTaskByDayId(1);
            foreach (Day day in days)
            {
                tasks.Add(taskRepository.GetTasksByDayId(day.DayId));
            }

            return Ok(new { status = 200, days /*tasks*/ });
        }

        [HttpDelete("Capstone/{capstoneId}/Day/{dayId}"), Authorize]
        public ActionResult DeleteDayById([Required] int dayId, [Required] int capstoneId)
        {
            if (!DayExists(dayId))
            {
                return BadRequest("day with this Id does not exist");
            }

            dayRepository.RemoveDay(dayId);
            _dayContext.SaveChanges();
            capstoneRepository.UpdateCapstone(capstoneRepository.GetCapstoneById(capstoneId));
            return NoContent();
        }

        [HttpPut("Capstone/{capstoneId}/Day/{dayId}")]
        [Authorize]
        public ActionResult PutDay([Required] int capstoneId, [Required] int dayId, [FromBody, Required] Day day)
        {
            if (capstoneId != day.CapstoneId)
            {
                return BadRequest();
            }

            _dayContext.Entry(day).State = EntityState.Modified;

            try
            {
                _dayContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dayRepository.DayExists(dayId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return Ok();
        }

        #endregion

        #region Task CRUD

        private bool TaskExists(int taskId)
        {
            return taskRepository.TaskExists(taskId);
        }

        [HttpPost("Day/{dayId}/Task"), Authorize]
        public ActionResult CreateTask( [Required] int dayId, [Required, FromBody] Task task)
        {
            if (task == null)
            {
                return BadRequest("");
            }
            if (task.DayId != dayId)
            {
                return BadRequest();
            }

            taskRepository.CreateTask(task);
            _taskContext.SaveChanges();
            dayRepository.UpdateDay(dayId);

            return Ok();
        }

        [HttpGet("Day/{dayId}/Task/{taskId}"), Authorize]
        public ActionResult GetTaskById([Required] int taskId)
        {
            if (!TaskExists(taskId))
            {
                return BadRequest("Task with this Id does not exist");
            }

            Task task = taskRepository.GetTaskById(taskId);

            return Ok(new { status = 200, task });
        }
        
        [HttpGet("Day/{dayId}/Tasks"), Authorize]
        public ActionResult GetTaskByDayId([Required] int dayId)
        {
            if (!DayExists(dayId))
            {
                return BadRequest("There is no day with this Id");
            }

            List<Task> tasks = taskRepository.GetTasksByDayId(dayId);

            //if (tasks.Count < 1)
            //{
            //    return NotFound("There are no Tasks for this Day");
            //}

            return Ok(new { status = 200, tasks });
        }

        [HttpDelete("Day/{dayId}/Task/{taskId}"), Authorize]
        public ActionResult DeleteTaskById([Required] int taskId)
        {
            if (!TaskExists(taskId))
            {
                return BadRequest("No task exists with this id");
            }

            taskRepository.RemoveTask(taskId);
            _taskContext.SaveChanges();

            return NoContent();
        }

        [HttpPut("Day/{dayId}/Task/{taskId}")]
        [Authorize]
        public ActionResult PutTask([Required] int dayId, [Required] int taskId, [FromBody, Required] Task task)
        {
            if (dayId != task.DayId)
            {
                return BadRequest();
            }

            _taskContext.Entry(task).State = EntityState.Modified;

            try
            {
                _taskContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!taskRepository.TaskExists(taskId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return Ok();
        }

        #endregion

    }
}