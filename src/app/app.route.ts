import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NotpagefoundComponent } from './shared/notpagefound/notpagefound.component';
import { RegisterComponent } from './login/register.component';

const app_routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotpagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(app_routes, { useHash: true });
