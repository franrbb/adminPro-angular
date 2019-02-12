import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from 'src/app/services/guards/admin.guard';

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
      { path: 'busqueda/:termino', component: BusquedaComponent, data:{titulo: 'Buscador'}},

      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
      },
      { path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento de hospitales'}},
      { path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento de medicos'}},
      { path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Actualizar médico'}},
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(PagesRoutes);
