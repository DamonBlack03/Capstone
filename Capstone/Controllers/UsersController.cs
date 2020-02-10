using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Capstone.models;
using System.ComponentModel.DataAnnotations;
using Capstone.Services.Repositories;

namespace Capstone.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;
        public UserRepository userRepository { get; set; }

        public UsersController(UserContext context)
        {
            _context = context;
            userRepository = new UserRepository(_context);
        }

        // GET: api/Users
        [HttpGet]
        public JsonResult GetUsers()
        {
            return new JsonResult(_context.Users);
        }

        // GET: api/Users/5
        [HttpGet("{id:int}", Name = "GetUserById")]
        public ActionResult GetUserById([Required] int id)
        {
            User user = userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { status = "success", user });
        }

        [HttpGet("{username}")]
        public ActionResult GetUserByUsername([Required] string username)
        {
            User user = userRepository.GetUserByUsername(username);

            if (user == null)
            {
                NotFound();
            }

            return Ok(new { status = "success", user });
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public ActionResult PutUser([Required] int id, [FromBody, Required] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
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


            return CreatedAtRoute("GetUserById", new { id = user.Id }, user);
        }

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult PostUser([FromBody ,Required]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            userRepository.CreateUser(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUserById", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public ActionResult DeleteUser([Required] int id)
        {
            if (userRepository.UserExists(id))
            {
                userRepository.RemoveUser(id);
                _context.SaveChanges();
                return NoContent();
            }

            return NotFound();
        }
    }
}
