using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class Seed
{
    public static async Task SeedUsersAndCourses(UserManager<AppUser> userManager, AppDbContext context)
    {
        if (await userManager.Users.AnyAsync(x => x.UserName == "student1") &&
            await userManager.Users.AnyAsync(x => x.UserName == "student2"))
        {
            return;
        }

        var users = new List<AppUser>
        {
            new()
            {
                UserName = "student1",
                Email = "student1@test.com",
                DisplayName = "Student One"
            },
            new()
            {
                UserName = "student2",
                Email = "student2@test.com",
                DisplayName = "Student Two"
            }
        };

        foreach (var user in users)
        {
            if (!await userManager.Users.AnyAsync(x => x.UserName == user.UserName))
            {
                var result = await userManager.CreateAsync(user, "Password1!");

                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }

        if (await context.Courses.AnyAsync()) return;

        context.Courses.AddRange(
            new Course
            {
                Title = "ASP.NET Core Web API Basics",
                PlatformId = 4,
                TopicId = 1,
                IsCompleted = false,
                Rating = 4,
                Notes = "Learning controllers, DTOs and EF Core.",
                Username = "student1",
                Date = DateTime.UtcNow.AddDays(-3)
            },
            new Course
            {
                Title = "SQL Fundamentals",
                PlatformId = 1,
                TopicId = 2,
                IsCompleted = true,
                Rating = 5,
                Notes = "Completed joins and stored procedures section.",
                Username = "student1",
                Date = DateTime.UtcNow.AddDays(-10)
            },
            new Course
            {
                Title = "Angular Standalone Components",
                PlatformId = 2,
                TopicId = 1,
                IsCompleted = false,
                Rating = 3,
                Notes = "Need to revise signals.",
                Username = "student2",
                Date = DateTime.UtcNow.AddDays(-8)
            },
            new Course
            {
                Title = "Azure App Service Deployment",
                PlatformId = 4,
                TopicId = 3,
                IsCompleted = true,
                Rating = 4,
                Notes = "Good introduction to publishing apps.",
                Username = "student2",
                Date = DateTime.UtcNow.AddDays(-20)
            }
        );

        await context.SaveChangesAsync();
    }
}