import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public _usuarioService: UsuarioService, public _router: Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();


    this.email = localStorage.getItem('email' || '');
    /*if(this.email.length > 1){
      this.recuerdame = true;
    }*/
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '218640746872-o3ms463mm2qksg567b52nmqtgar7dr8d.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href="#/dashboard");
      //console.log(token);
    });
  }

  login(form: NgForm){
    if(form.invalid){
      return;
    }

    let usuario = new Usuario(null, form.value.email, form.value.clave);

    this._usuarioService.login(usuario, form.value.recuerdame)
      .subscribe(correcto => this._router.navigate(['/dashboard']));

  }

}
