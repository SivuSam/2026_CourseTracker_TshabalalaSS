import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseCreate, CourseUpdate } from '../../../core/models/course';
import { Platform } from '../../../core/models/platform';
import { Topic } from '../../../core/models/topic';
import { CourseService } from '../../../core/services/course.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-course-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css'
})
export class CourseForm implements OnInit {
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  platforms = signal<Platform[]>([]);
  topics = signal<Topic[]>([]);

  isEditMode = false;
  courseId?: number;

  model: CourseCreate | CourseUpdate = {
    title: '',
    platformId: 0,
    topicId: 0,
    isCompleted: false,
    rating: null,
    notes: ''
  };

  ngOnInit(): void {
    this.loadLookups();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.courseId = Number(id);
      this.loadCourse(this.courseId);
    }
  }

  loadLookups() {
    this.courseService.getPlatforms().subscribe({
      next: platforms => this.platforms.set(platforms),
      error: () => this.toastService.error('Failed to load platforms')
    });

    this.courseService.getTopics().subscribe({
      next: topics => this.topics.set(topics),
      error: () => this.toastService.error('Failed to load topics')
    });
  }

  loadCourse(id: number) {
    this.courseService.getCourse(id).subscribe({
      next: course => {
        this.model = {
          title: course.title,
          platformId: course.platformId,
          topicId: course.topicId,
          isCompleted: course.isCompleted,
          rating: course.rating ?? null,
          notes: course.notes ?? ''
        };
      },
      error: () => this.toastService.error('Failed to load course')
    });
  }

  saveCourse() {
    if (this.isEditMode && this.courseId) {
      this.courseService.updateCourse(this.courseId, this.model).subscribe({
        next: () => {
          this.toastService.success('Course updated successfully');
          this.router.navigateByUrl('/courses');
        },
        error: () => this.toastService.error('Failed to update course')
      });
    } else {
      this.courseService.createCourse(this.model).subscribe({
        next: () => {
          this.toastService.success('Course created successfully');
          this.router.navigateByUrl('/courses');
        },
        error: () => this.toastService.error('Failed to create course')
      });
    }
  }
}