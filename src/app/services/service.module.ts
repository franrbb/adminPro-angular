import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService } from './service.index';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchvivoService } from 'src/app/services/subir-archivo/subir-archvivo.service';
import { ModalUploadService } from '../components/modal-update/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';
import { AdminGuard } from 'src/app/services/guards/admin.guard';

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
    SubirArchvivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard
  ]
})
export class ServiceModule { }
