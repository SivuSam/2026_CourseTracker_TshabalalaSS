import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

export const courseDetailResolver: ResolveFn<Course> = (route) => {
  const courseService = inject(CourseService);
  const id = Number(route.paramMap.get('id'));

  return courseService.getCourse(id);
};