import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');

    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(model: { username: string; password: string }) {
    return this.http.post<User>(this.baseUrl + 'account/login', model, {
      withCredentials: true
    });
  }

  register(model: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }) {
    return this.http.post<User>(this.baseUrl + 'account/register', model, {
      withCredentials: true
    });
  }

  refreshToken() {
    return this.http.post<User>(this.baseUrl + 'account/refresh-token', {}, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {}, {
      withCredentials: true
    }).subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.currentUser.set(null);
        this.router.navigateByUrl('/');
      },
      error: () => {
        localStorage.removeItem('user');
        this.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    });
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}