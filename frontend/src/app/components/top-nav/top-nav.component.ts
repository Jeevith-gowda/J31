import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="topnav" role="banner">
      <div class="topnav-inner container" role="navigation" aria-label="Main">
        <div class="brand" aria-label="App Brand">
          <div class="brand-badge" aria-hidden="true">J</div>
          J31 Healthcare
        </div>
        <nav class="navlinks">
          <a routerLink="/dashboard" routerLinkActive="active" class="navlink" aria-label="Dashboard">Dashboard</a>
          <a routerLink="/summary" routerLinkActive="active" class="navlink" aria-label="Summary">Summary</a>
          <a routerLink="/reports" routerLinkActive="active" class="navlink" aria-label="Reports">Reports</a>
        </nav>
        <div class="spacer"></div>
        <button class="btn" (click)="onLogout()" aria-label="Logout">Logout</button>
      </div>
    </header>
  `,
  styles: []
})
export class TopNavComponent {
  constructor(private auth: AuthService, private router: Router) {}
  isAuthed() { return this.auth.isAuthenticated(); }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
