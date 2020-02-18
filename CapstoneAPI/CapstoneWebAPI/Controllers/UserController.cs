using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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

            userRepository = new UserRepository(_userContext);
            capstoneRepository = new CapstoneRepository(_capstoneContext);
            dayRepository = new DayRepository(_dayContext);
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
                NotFound();
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
            if (userRepository.UserExists(id))
            {
                userRepository.RemoveUser(id);
                _userContext.SaveChanges();
                return NoContent();
            }

            return NotFound();
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
                return BadRequest();
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
            List<Models.Capstone> capstones = capstoneRepository.GetCapstonesByUserId(UserId);

            if (capstones.Count == 0)
            {
                return BadRequest("No Capstones for this user");
            }

            return Ok(new { status = 200, capstones });
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
        public ActionResult PutUser([Required] int UserId, [Required] int capstoneId, [FromBody, Required] Capstone capstone)
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


            return Ok();//CreatedAtRoute("GetCapstoneById", new { UserId = UserId, capstoneId = capstoneId }, capstone);
        }

        #endregion

        #region Day CRUD

        private bool DayExists(int id)
        {
            return dayRepository.DayExists(id);
        }

        [HttpPost("{userId}/Capstone/{capstoneId}"), Authorize]
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

            return Ok();
        }
        
        [HttpGet("{userId}/Capstone/{captoneId}/Day/{dayId}"), Authorize]
        public ActionResult GetDayById(int dayId)
        {
            return Ok();
        }

        #endregion

        #region Task CRUD

        #endregion

    }
}