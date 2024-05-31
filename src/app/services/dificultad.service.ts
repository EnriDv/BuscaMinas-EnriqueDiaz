import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DificultadService {
  private dificultadSeleccionadaSubject = new BehaviorSubject<string>('');
  dificultadSeleccionada$: Observable<string> = this.dificultadSeleccionadaSubject.asObservable();

  constructor() {}

  setDificultad(dificultad: string) {
    this.dificultadSeleccionadaSubject.next(dificultad);
  }
}
