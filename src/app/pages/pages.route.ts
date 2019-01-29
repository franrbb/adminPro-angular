import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

const PagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress'}},
      { path: 'graficas1', component: Graficas1Component, data:{titulo: 'Graficas'}},
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(PagesRoutes);
