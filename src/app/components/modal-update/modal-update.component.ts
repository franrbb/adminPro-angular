import { Component, OnInit } from '@angular/core';

import { ModalUploadService } from './modal-upload.service';
import { SubirArchvivoService } from 'src/app/services/subir-archivo/subir-archvivo.service';



@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styles: []
})
export class ModalUpdateComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _subirArchivoService: SubirArchvivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      swal('Sólo imágenes', 'El archvivo seleccionado no es una imager', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then(resp => {
      this._modalUploadService.notificacion.emit(resp);
      this._modalUploadService.ocultarModal();
    })
    .catch(err => {
      console.log('Error en la carga...');
    });
  }

}
