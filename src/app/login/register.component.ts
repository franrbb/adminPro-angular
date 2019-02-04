import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';


import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  formu: FormGroup;

  constructor(public _usuarioService: UsuarioService, public _router: Router) { }

  sonIguales(campo1: string, campo2: string){

    return(group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      };
    }

  }

  ngOnInit() {
    init_plugins();

    this.formu = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      clave: new FormControl(null, Validators.required),
      clave2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
      }, {validators: this.sonIguales('clave', 'clave2')});
  }

  registrarUsuario(){
    if(this.formu.invalid){
      return;
    }

    if(!this.formu.value.condiciones){
      swal("Importante", "Debe aceptar las condiciones", "warning");
      return;
    }

    let usuario = new Usuario(
      this.formu.value.nombre,
      this.formu.value.email,
      this.formu.value.clave
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resp => this._router.navigate(['/login']));
  }

}
