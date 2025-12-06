import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="center">
      <section aria-labelledby="loginTitle" class="card" style="width: 420px; max-width: 92vw;">
        <h1 id="loginTitle">Welcome to J31</h1>
        <p class="help">Sign in to access the dashboard, summary, and reports.</p>

        <form class="form" (ngSubmit)="onSubmit()" aria-describedby="loginHelp">
          <div class="field">
            <label class="label" for="username">Username</label>
            <input class="input" id="username" [(ngModel)]="username" name="username" required aria-required="true" />
          </div>
          <div class="field">
            <label class="label" for="password">Password</label>
            <input class="input" id="password" [(ngModel)]="password" name="password" type="password" required aria-required="true" />
          </div>
          <p id="loginHelp" class="help">Use your first name for both username and password.</p>
          <button class="btn" type="submit">Login</button>
          <p class="error" *ngIf="error">{{ error }}</p>
        </form>
      </section>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
