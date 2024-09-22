import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  // Simulated users
  private users = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
  ];

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    // if (user) {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.loggedIn = false;
  }

  private userRole = 'users'; // Default role

  setRole(role: string) {
    this.userRole = role;
  }

  hasRole(role: string): boolean {
    return this.userRole === role;
  }
}
