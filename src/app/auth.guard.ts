import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
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
export class AuthGuard
  implements CanLoad, CanMatch, CanActivate, CanActivateChild
{
  constructor(private authService: AuthService, private router: Router) {}

  // 1. Prevent lazy-loading with CanLoad
  canLoad(route: Route): boolean | Observable<boolean> {
    if (this.authService.isLoggedIn()) {
      // Check if user is logged in and has permission
      return true;
    } else {
      alert('Module not loaded! Please login to access.');
      this.router.navigate(['/login']);
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
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }

  // CanActivateChild method to protect child routes
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is logged in and has permission
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to login if not authorized
      alert('Access Denied! You are not authorized to view this page.');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
