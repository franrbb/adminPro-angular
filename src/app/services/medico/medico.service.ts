import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medico: Medico;
  totalMedicos: number = 0;

  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';

    return this._http.get(url)
    .pipe(map((resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  buscarMedico(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this._http.get(url)
    .pipe(map((res: any) => res.medicos));
  }

  guardarMedico(medico: Medico){
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      //Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this._http.put( url, medico )
        .pipe(map( (resp: any) => {
          swal('Médico Actualizado', medico.nombre, 'success');
          return resp.medico;
        }));

    }else{
      //Creando
      url += '?token=' + this._usuarioService.token;

      return this._http.post(url, medico)
      .pipe(map((resp: any) => {
        swal('Medico creado', medico.nombre, 'success');
        return resp.medico;
      }));
    }
  }

  borrarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' +id;
    url += '?token=' + this._usuarioService.token;

    return this._http.delete(url)
    .pipe(map((res: any) => {
      swal('Medico borrado', 'El medico ha sido borrado correctamente', 'success');
      return true;
    }));
  }

  obtenerMedico(id: string){
    let url = URL_SERVICIOS +'/medico/' +id;

    return this._http.get(url)
    .pipe(map((resp: any) => resp.medico));
  }

}
