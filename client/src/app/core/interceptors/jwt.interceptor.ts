import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userString = localStorage.getItem('user');

  if (!userString) return next(req);

  const user = JSON.parse(userString);

  if (user?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(req);
};