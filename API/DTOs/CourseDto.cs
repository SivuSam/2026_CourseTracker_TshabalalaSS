namespace API.DTOs;

public class CourseDto
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public required string Title { get; set; }

    public int PlatformId { get; set; }

    public string? PlatformName { get; set; }

    public int TopicId { get; set; }

    public string? TopicName { get; set; }

    public bool IsCompleted { get; set; }

    public int? Rating { get; set; }

    public string? Notes { get; set; }
}