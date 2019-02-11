import { Component, OnInit } from '@angular/core';
declare var swal: any;

import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-update/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);
  }

    buscarHospital(termino: string){
      if(termino.length <= 0){
        this.cargarHospitales();
        return;
      }

      this._hospitalService.buscarHospital(termino)
        .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
    }

  crearHospital(){
    swal({
      title: "Crear hospital",
      text: "Ingrese el nombre del hospital",
      content: 'input',
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
      .subscribe(() => this.cargarHospitales());

    });
  }

  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
  }


  borrarHospital(hospital: Hospital){
    this._hospitalService.borrarHospital(hospital._id)
    .subscribe( () => this.cargarHospitales());
  }

  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
