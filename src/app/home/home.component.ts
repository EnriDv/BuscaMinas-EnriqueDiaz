import { Component, Output, EventEmitter } from '@angular/core';
import { DificultadService } from '../services/dificultad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private dificultadService: DificultadService) {}

  enviar(dificultad: string) {
    this.dificultadService.setDificultad(dificultad);
    console.log(dificultad);
  }
}


