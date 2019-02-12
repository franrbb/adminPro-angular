import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public _activatedRoute: ActivatedRoute, public _http: HttpClient) {
    _activatedRoute.params
    .subscribe(params => {
      let termino = params['termino'];
      this.buscar( termino );
    });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this._http.get( url )
        .subscribe( (resp: any) => {

          console.log( resp );
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          this.usuarios = resp.usuarios;
        });

  }

}
