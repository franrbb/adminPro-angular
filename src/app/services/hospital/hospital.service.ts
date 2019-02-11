import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Injectable()
export class HospitalService {
  hospital: Hospital;
  totalHospitales: number = 0;

  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) {

  }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';

    return this._http.get(url)
    .pipe(map((resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  buscarHospital(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
      return this._http.get(url)
      .pipe(map((res: any) => res.hospitales));
  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this._http.get( url )
                .pipe(map( (resp: any) => resp.hospital ));

  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this._http.post(url, {nombre})
      .pipe(map((res: any) => {
       swal('Hospital creado', nombre, 'success');
       return res.usuario;
     }));
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this._http.put(url, hospital)
      .pipe(map((res: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return res.hospital;
      }));
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' +id;
    url += '?token=' + this._usuarioService.token;

    return this._http.delete(url)
    .pipe(map((res: any) => {
      swal('Hospital borrado', 'Hospital ha sido borrado correctamente', 'success');
      return true;
    }));
  }


}
