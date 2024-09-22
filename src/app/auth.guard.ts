import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.isLoggedIn()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
//   return true;
// };

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // 1. Prevent lazy-loading with CanLoad
  canLoad(route: Route): boolean | Observable<boolean> {
    const requiredRole = this.authService.hasRole('admin');

    if (requiredRole) {
      return true; // Allow loading if user is an admin
    } else {
      alert('Module not loaded! Please login to access.');
      this.router.navigate(['/unauthorized']); // Redirect if not admin
      return false; // Prevent module from loading
    }
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    const requiredRole = route.data?.['role'];

    if (this.authService.hasRole(requiredRole)) {
      return true; // Allow matching if the role matches
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized page if not matched
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
