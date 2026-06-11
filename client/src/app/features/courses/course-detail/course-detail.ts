import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {
  private route = inject(ActivatedRoute);

  course = signal<Course | null>(null);

  ngOnInit(): void {
    this.course.set(this.route.snapshot.data['course']);
  }
}