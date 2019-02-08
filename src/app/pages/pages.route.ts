import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const PagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate:[LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress'}},
      { path: 'graficas1', component: Graficas1Component, data:{titulo: 'Graficas'}},
      { path: 'perfil', component: ProfileComponent, data:{titulo: 'Perfil'}},
      { path: 'usuarios', component: UsuariosComponent, data:{titulo: 'Mantenimiento de usuarios'}},
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(PagesRoutes);
