import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService } from './service.index';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchvivoService } from 'src/app/services/subir-archivo/subir-archvivo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [

  ],
  providers:[
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchvivoService
  ]
})
export class ServiceModule { }
