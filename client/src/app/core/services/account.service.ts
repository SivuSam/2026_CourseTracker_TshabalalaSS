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
  private refreshTimer?: ReturnType<typeof setTimeout>;

  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');

    if (user) {
      this.currentUser.set(JSON.parse(user));
      this.startRefreshTokenTimer();
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

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.startRefreshTokenTimer();
  }

  logout() {
    this.stopRefreshTokenTimer();

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

  startRefreshTokenTimer() {
    this.stopRefreshTokenTimer();

    this.refreshTimer = setTimeout(() => {
      this.refreshToken().subscribe({
        next: user => this.setCurrentUser(user),
        error: () => this.logout()
      });
    }, 7 * 24 * 60 * 60 * 1000);
  }

  stopRefreshTokenTimer() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }
}