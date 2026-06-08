using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class CoursesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
    {
        var username = User.GetUsername();

        return await context.Courses
            .Include(x => x.Platform)
            .Include(x => x.Topic)
            .Where(x => x.Username == username)
            .OrderByDescending(x => x.Date)
            .Select(x => CourseToDto(x))
            .ToListAsync();
    }

    [HttpGet("pastmonth")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetCoursesPastMonth()
    {
        var username = User.GetUsername();
        var dateFrom = DateTime.UtcNow.AddDays(-30);

        return await context.Courses
            .Include(x => x.Platform)
            .Include(x => x.Topic)
            .Where(x => x.Username == username && x.Date >= dateFrom)
            .OrderByDescending(x => x.Date)
            .Select(x => CourseToDto(x))
            .ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CourseDto>> GetCourse(int id)
    {
        var username = User.GetUsername();

        var course = await context.Courses
            .Include(x => x.Platform)
            .Include(x => x.Topic)
            .FirstOrDefaultAsync(x => x.Id == id && x.Username == username);

        if (course == null) return NotFound();

        return CourseToDto(course);
    }

    [HttpPost]
    public async Task<ActionResult<CourseDto>> CreateCourse(CourseCreateDto courseDto)
    {
        var username = User.GetUsername();

        var platformExists = await context.Platforms.AnyAsync(x => x.Id == courseDto.PlatformId);
        var topicExists = await context.Topics.AnyAsync(x => x.Id == courseDto.TopicId);

        if (!platformExists) return BadRequest("Invalid platform selected");
        if (!topicExists) return BadRequest("Invalid topic selected");

        var course = new Course
        {
            Title = courseDto.Title,
            PlatformId = courseDto.PlatformId,
            TopicId = courseDto.TopicId,
            IsCompleted = courseDto.IsCompleted,
            Rating = courseDto.Rating,
            Notes = courseDto.Notes,
            Username = username,
            Date = DateTime.UtcNow
        };

        context.Courses.Add(course);

        await context.SaveChangesAsync();

        var createdCourse = await context.Courses
            .Include(x => x.Platform)
            .Include(x => x.Topic)
            .FirstAsync(x => x.Id == course.Id);

        return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, CourseToDto(createdCourse));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateCourse(int id, CourseUpdateDto courseDto)
    {
        var username = User.GetUsername();

        var course = await context.Courses
            .FirstOrDefaultAsync(x => x.Id == id && x.Username == username);

        if (course == null) return NotFound();

        var platformExists = await context.Platforms.AnyAsync(x => x.Id == courseDto.PlatformId);
        var topicExists = await context.Topics.AnyAsync(x => x.Id == courseDto.TopicId);

        if (!platformExists) return BadRequest("Invalid platform selected");
        if (!topicExists) return BadRequest("Invalid topic selected");

        course.Title = courseDto.Title;
        course.PlatformId = courseDto.PlatformId;
        course.TopicId = courseDto.TopicId;
        course.IsCompleted = courseDto.IsCompleted;
        course.Rating = courseDto.Rating;
        course.Notes = courseDto.Notes;

        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPatch("{id:int}")]
    public async Task<ActionResult> MarkCourseCompleted(int id)
    {
        var username = User.GetUsername();

        var course = await context.Courses
            .FirstOrDefaultAsync(x => x.Id == id && x.Username == username);

        if (course == null) return NotFound();

        if (!course.IsCompleted)
        {
            course.IsCompleted = true;
            course.Date = DateTime.UtcNow;
            await context.SaveChangesAsync();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteCourse(int id)
    {
        var username = User.GetUsername();

        var course = await context.Courses
            .FirstOrDefaultAsync(x => x.Id == id && x.Username == username);

        if (course == null) return NotFound();

        context.Courses.Remove(course);

        await context.SaveChangesAsync();

        return NoContent();
    }

    private static CourseDto CourseToDto(Course course)
    {
        return new CourseDto
        {
            Id = course.Id,
            Date = course.Date,
            Title = course.Title,
            PlatformId = course.PlatformId,
            PlatformName = course.Platform?.Name,
            TopicId = course.TopicId,
            TopicName = course.Topic?.Name,
            IsCompleted = course.IsCompleted,
            Rating = course.Rating,
            Notes = course.Notes
        };
    }
}