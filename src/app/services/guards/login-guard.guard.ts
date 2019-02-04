import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public _router: Router){

  }

  canActivate(){
    if(this._usuarioService.estaLogueado()){
      console.log('Paso el login');
      return true;
    }else{
      console.log('Bloqueado');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
