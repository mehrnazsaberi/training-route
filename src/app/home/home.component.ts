import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);
  authSerivce = inject(AuthService);

  navigateTo(route: string, role?: string) {
    if (role) {
      this.authSerivce.setRole(role);
      this.router.navigate([route]);
    } else {
      this.router.navigate([route]);
    }
  }
}
