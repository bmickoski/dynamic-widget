import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('../admin/admin.component').then((mod) => mod.AdminComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
