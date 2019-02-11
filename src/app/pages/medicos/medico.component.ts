import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-update/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '' ,'' ,'');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    _activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.obtenerMedico( id );
      }

    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
    .subscribe(hospitales => this.hospitales = hospitales);

    this._modalUploadService.notificacion
    .subscribe( resp => {
      this.medico.img = resp.medico.img;
    });
  }

  crearMedico(f: NgForm){
    if(f.invalid){
      return;
    }

    this._medicoService.guardarMedico(this.medico)
    .subscribe(medico => {
      this.medico._id = medico._id;
      this._router.navigate(['/medico', medico._id]);
    });

  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id)
    .subscribe(hospital => this.hospital = hospital);
  }

  obtenerMedico(id: string){
    this._medicoService.obtenerMedico( id )
    .subscribe( medico => {
      //console.log( medico );
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital )
    });
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
