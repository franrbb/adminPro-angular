import { NgModule } from '@angular/core';

//MODULOS
import { SharedModule } from '../shared/shared.module';

//RUTAS
import { PAGES_ROUTES } from './pages.route';

//COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


@NgModule({
  imports: [
    SharedModule,
    PAGES_ROUTES
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  providers: []
})
export class PagesModule { }
