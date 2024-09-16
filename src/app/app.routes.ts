import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/layout/routes').then((mod) => mod.routes),
  },
  { path: '**', redirectTo: 'errors/404' },
];
