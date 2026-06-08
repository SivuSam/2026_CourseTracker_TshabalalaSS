using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CourseCreateDto
{
    [Required]
    public required string Title { get; set; }

    [Required]
    public int PlatformId { get; set; }

    [Required]
    public int TopicId { get; set; }

    public bool IsCompleted { get; set; }

    [Range(1, 5)]
    public int? Rating { get; set; }

    public string? Notes { get; set; }
}