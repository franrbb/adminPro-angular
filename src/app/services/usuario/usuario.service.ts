import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchvivoService } from 'src/app/services/subir-archivo/subir-archvivo.service';


@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public _http: HttpClient, public _router: Router, public _subirArchivoService: SubirArchvivoService) {
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';

    return this._http.post(url, {token})
    .pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  login(usuario: Usuario, recuerdame: boolean = false){
    if(recuerdame){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this._http.post(url, usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        //localStorage.setItem('id', resp.id);
        //localStorage.setItem('token', resp.token);
        //localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        return true;
      }));
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this._http.post(url, usuario)
      .pipe(map((res: any) => {
       swal('Usuario creado', usuario.email, 'success');
       return res.usuario;
     }));

  }

  actualizarUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this._http.put(url, usuario)
      .pipe(map((res: any) => {
        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = res.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }


       swal('Usuario actualizado', usuario.nombre, 'success');
       return true;
     }));
  }

  cambiarImagen(archivo: File, id:string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this._http.get(url);
  }

  buscarUsuario(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
      return this._http.get(url)
      .pipe(map((res: any) => res.usuarios));
  }

  borrarUsuario(id: string){
    let url = URL_SERVICIOS + '/usuario/' +id;
    url += '?token=' + this.token;

    return this._http.delete(url)
    .pipe(map((res: any) => {
      swal('Usuario borrado', 'el usuario ha sido borrado correctamente', 'success');
      return true;
    }));
  }

}
