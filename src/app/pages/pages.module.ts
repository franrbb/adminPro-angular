import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

//MODULOS
import { SharedModule } from '../shared/shared.module';

//RUTAS
import { PAGES_ROUTES } from './pages.route';

//COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


@NgModule({
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  providers: []
})
export class PagesModule { }
