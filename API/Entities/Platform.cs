namespace API.Entities;

public class Platform
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public ICollection<Course> Courses { get; set; } = [];
}