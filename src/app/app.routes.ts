import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutDetailsComponent } from './about/about-details/about-details.component';
import { AboutHistoryComponent } from './about/about-history/about-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
    canActivateChild: [AuthGuard], // Protect child routes using CanActivateChild
    children: [
      { path: 'details', component: AboutDetailsComponent },
      { path: 'history', component: AboutHistoryComponent },
    ],
  },
  {
    path: 'check',
    //   redirectTo: (url) => url.includes('special') ? '/special-path' : '/default-path',
    redirectTo: ({ queryParams }) => {
      const category = queryParams['category'];
      if (category !== undefined) {
        return `/product/${category}`;
      } else {
        return `/not-found`;
      }
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canMatch: [AuthGuard],
    data: { role: 'admin' }, // Only allow matching for users with the 'admin' role
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'shop',
    canLoad: [AuthGuard],
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },
  { path: 'login', component: LoginComponent },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product/product.component').then((m) => m.ProductComponent),
  },
  { path: '**', component: PageNotFoundComponent },
];
