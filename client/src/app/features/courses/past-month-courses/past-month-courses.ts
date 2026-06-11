import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../../core/models/course';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-past-month-courses',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './past-month-courses.html',
  styleUrl: './past-month-courses.css'
})
export class PastMonthCourses implements OnInit {
  private courseService = inject(CourseService);

  courses = signal<Course[]>([]);

  counter = computed(() => this.courses().length);

  ngOnInit(): void {
    this.courseService.getPastMonthCourses().subscribe({
      next: courses => this.courses.set(courses),
      error: error => console.log(error)
    });
  }
}