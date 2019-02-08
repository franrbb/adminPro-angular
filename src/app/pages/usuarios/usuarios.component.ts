import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-update/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  total_registros: number = 0;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.total_registros = resp.total;
        this.usuarios = resp.usuarios;
      })
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    console.log(desde);

    if(desde >= this.total_registros){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuario(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
    }

    guardarUsuario(usuario: Usuario){
      this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
    }

    borrarUsuario(usuario: Usuario){
      if(usuario._id === this._usuarioService.usuario._id){
        swal('Usuario no borrado', 'No se puede borrar a si mismo', 'error');
        return;
      }

      swal({
        title: "¿Está seguro?",
        text: "Está a punto de borrar a " +usuario.email,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((borrar) => {
        console.log(borrar);
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(borrado => {
            console.log(borrado);
            this.cargarUsuarios();
          })
        };
      });
    }
}
