using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Course
{
    public int Id { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow;

    [Required]
    public required string Title { get; set; }

    [Required]
    public int PlatformId { get; set; }

    public Platform? Platform { get; set; }

    [Required]
    public int TopicId { get; set; }

    public Topic? Topic { get; set; }

    public bool IsCompleted { get; set; }

    [Range(1, 5)]
    public int? Rating { get; set; }

    public string? Notes { get; set; }

    [Required]
    public required string Username { get; set; }
}