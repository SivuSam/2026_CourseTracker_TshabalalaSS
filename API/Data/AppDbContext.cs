using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Course> Courses => Set<Course>();

    public DbSet<Platform> Platforms => Set<Platform>();

    public DbSet<Topic> Topics => Set<Topic>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Platform>().HasData(
            new Platform { Id = 1, Name = "Udemy" },
            new Platform { Id = 2, Name = "Coursera" },
            new Platform { Id = 3, Name = "YouTube" },
            new Platform { Id = 4, Name = "Microsoft Learn" },
            new Platform { Id = 5, Name = "Pluralsight" }
        );

        builder.Entity<Topic>().HasData(
            new Topic { Id = 1, Name = "Web Development" },
            new Topic { Id = 2, Name = "Databases" },
            new Topic { Id = 3, Name = "Cloud Computing" },
            new Topic { Id = 4, Name = "Cybersecurity" },
            new Topic { Id = 5, Name = "Programming" }
        );
    }
}