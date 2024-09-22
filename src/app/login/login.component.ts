import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']); // Redirect to the home page or any protected page after login
      // const returnUrl =
      //   this.route.snapshot.queryParams['returnUrl'] || '/home'; // Check if there's a return URL
      // this.router.navigate([returnUrl]); // Redirect after successful login
    } else {
      this.loginError = 'Invalid username or password';
    }
  }
}
