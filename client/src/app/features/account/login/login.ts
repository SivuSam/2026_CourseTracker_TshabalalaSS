import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);

  model = {
    username: '',
    password: ''
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next: user => {
        this.accountService.setCurrentUser(user);

        this.model = {
          username: '',
          password: ''
        };

        this.router.navigateByUrl('/courses');
      },
      error: error => console.log(error)
    });
  }
  ngOnInit(): void {
    this.model = {
      username: '',
      password: ''
    };
  }
}