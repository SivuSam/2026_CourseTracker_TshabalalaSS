using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PlatformsController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetPlatforms()
    {
        return await context.Platforms
            .OrderBy(x => x.Name)
            .Select(x => new LookupDto
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();
    }
}