import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accountService = inject(AccountService);
  private router = inject(Router);

  model = {
    username: '',
    displayName: '',
    email: '',
    password: ''
  };

  register() {
    this.accountService.register(this.model).subscribe({
      next: user => {
        this.accountService.setCurrentUser(user);
        this.router.navigateByUrl('/courses');
      },
      error: error => console.log(error)
    });
  }
}