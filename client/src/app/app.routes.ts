import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Disclaimer } from './pages/disclaimer/disclaimer';
import { Login } from './features/account/login/login';
import { Register } from './features/account/register/register';
import { CourseList } from './features/courses/course-list/course-list';
import { CourseDetail } from './features/courses/course-detail/course-detail';
import { CourseForm } from './features/courses/course-form/course-form';
import { courseDetailResolver } from './core/resolvers/course-detail.resolver';
import { PastMonthCourses } from './features/courses/past-month-courses/past-month-courses';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'disclaimer', component: Disclaimer },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'courses', component: CourseList, canActivate: [authGuard] },
  { path: 'courses/new', component: CourseForm, canActivate: [authGuard] },
  { path: 'courses/past-month', component: PastMonthCourses, canActivate: [authGuard] },
  {
    path: 'courses/:id',
    component: CourseDetail,
    resolve: { course: courseDetailResolver }
  },
  { path: 'courses/edit/:id', component: CourseForm, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }

];