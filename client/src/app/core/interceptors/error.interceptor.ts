import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastService.error('You are not authorised. Please log in again.');
        router.navigateByUrl('/login');
      }

      if (error.status === 404) {
        toastService.error('The requested item was not found.');
      }

      if (error.status === 500) {
        toastService.error('A server error occurred.');
      }

      if (error.status === 400) {
        if (typeof error.error === 'string') {
          toastService.error(error.error);
        } else {
          toastService.error('Please check your input and try again.');
        }
      }

      return throwError(() => error);
    })
  );
};