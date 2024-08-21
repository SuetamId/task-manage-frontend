import { Routes } from '@angular/router';
import { authGuard } from './authentication/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../app/pages/home/home.component').then(c => c.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('../app/pages/login/login.component').then(c => c.LoginComponent),
  },
  { path: '**', redirectTo: 'home' }
];
