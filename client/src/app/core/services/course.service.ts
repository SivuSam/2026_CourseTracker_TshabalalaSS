import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Course, CourseCreate, CourseUpdate } from '../models/course';
import { Platform } from '../models/platform';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = environment.apiUrl;

  courses = signal<Course[]>([]);
  pastMonthCourses = signal<Course[]>([]);

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<Course[]>(this.baseUrl + 'courses');
  }

  getPastMonthCourses() {
    return this.http.get<Course[]>(this.baseUrl + 'courses/pastmonth');
  }

  getCourse(id: number) {
    return this.http.get<Course>(this.baseUrl + 'courses/' + id);
  }

  createCourse(course: CourseCreate) {
    return this.http.post<Course>(this.baseUrl + 'courses', course);
  }

  updateCourse(id: number, course: CourseUpdate) {
    return this.http.put(this.baseUrl + 'courses/' + id, course);
  }

  markCompleted(id: number) {
    return this.http.patch(this.baseUrl + 'courses/' + id, {});
  }

  deleteCourse(id: number) {
    return this.http.delete(this.baseUrl + 'courses/' + id);
  }

  getPlatforms() {
    return this.http.get<Platform[]>(this.baseUrl + 'platforms');
  }

  getTopics() {
    return this.http.get<Topic[]>(this.baseUrl + 'topics');
  }
}