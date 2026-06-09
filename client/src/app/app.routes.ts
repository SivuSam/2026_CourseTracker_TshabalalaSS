import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Disclaimer } from './pages/disclaimer/disclaimer';
import { Login } from './features/account/login/login';
import { Register } from './features/account/register/register';
import { CourseList } from './features/courses/course-list/course-list';
import { CourseDetail } from './features/courses/course-detail/course-detail';
import { CourseForm } from './features/courses/course-form/course-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'disclaimer', component: Disclaimer },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'courses', component: CourseList },
  { path: 'courses/new', component: CourseForm },
  { path: 'courses/:id', component: CourseDetail },
  { path: 'courses/edit/:id', component: CourseForm },
  { path: '**', redirectTo: '' }
];