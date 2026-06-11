import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);
  courseIdToDelete = signal<number | null>(null);

  courses = signal<Course[]>([]);
  pageNumber = signal(1);
  pageSize = 10;

  totalPages = computed(() =>
    Math.ceil(this.courses().length / this.pageSize)
  );

  pagedCourses = computed(() => {
    const start = (this.pageNumber() - 1) * this.pageSize;
    return this.courses().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: courses => this.courses.set(courses),
      error: () => this.toastService.error('Failed to load courses')
    });
  }

  previousPage() {
    if (this.pageNumber() > 1) {
      this.pageNumber.update(value => value - 1);
    }
  }

  nextPage() {
    if (this.pageNumber() < this.totalPages()) {
      this.pageNumber.update(value => value + 1);
    }
  }

  markCompleted(course: Course) {
    if (course.isCompleted) return;

    this.courseService.markCompleted(course.id).subscribe({
      next: () => {
        this.toastService.success('Course marked as completed');
        this.loadCourses();
      },
      error: () => this.toastService.error('Failed to mark course as completed')
    });
  }

  openDeleteModal(id: number) {
    this.courseIdToDelete.set(id);

    const modal = document.getElementById('delete_course_modal') as HTMLDialogElement;
    modal.showModal();
  }

  confirmDeleteCourse() {
    const id = this.courseIdToDelete();

    if (!id) return;

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.toastService.success('Course deleted successfully');
        this.courseIdToDelete.set(null);
        this.loadCourses();
      },
      error: () => this.toastService.error('Failed to delete course')
    });
  }
}