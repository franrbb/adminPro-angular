import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() cambiovalor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  cambiavalor(valor){
    if(this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      return;
    }

        this.progreso = this.progreso + valor;

        this.cambiovalor.emit(this.progreso);

  }

}
