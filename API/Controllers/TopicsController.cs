using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class TopicsController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetTopics()
    {
        return await context.Topics
            .OrderBy(x => x.Name)
            .Select(x => new LookupDto
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();
    }
}