import { Component, OnInit } from '@angular/core';
import { DificultadService } from '../services/dificultad.service';
import { Casilla } from '../models/Casilla';
import { CasillaService } from '../services/casilla.service';
import { Estado } from '../models/Estado';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Casilla[][] = [];
  gameState: Estado = Estado.activo;
  difficulty: string = '';

  rows: number;
  columns: number;
  numberOfMines: number;
  celdas: any;

  constructor(
    private cellService: CasillaService,
    private dificultadService: DificultadService
  ) {
    this.rows= 5;
    this.columns = 5;
    this.numberOfMines = 0;
    this.celdas = {cellsOpened: 0, cells: this.rows * this.columns, numberMines: this.numberOfMines};
    this.changeDifficulty();
  }

  ngOnInit() {
    this.dificultadService.dificultadSeleccionada$.subscribe(dificultad => {
      this.difficulty = dificultad; // Recibe la dificultad seleccionada del servicio
      console.log(this.difficulty);
      this.changeDifficulty(); // Llama a la función para cambiar la dificultad cuando se recibe una nueva
    });
  }

  checkCell(row: number, column: number) {
    this.cellService.abrirCelda(this.board, row, column, this.celdas);
    this.gameState = this.cellService.cambiarEstado(this.board, row, column, this.celdas, this.numberOfMines, this.gameState);
  }

  reiniciar() {
    this.board = this.cellService.generarTablero(this.rows, this.columns, this.numberOfMines);
    this.gameState = Estado.activo;
    this.celdas = { cellsOpened: 0, cells: this.rows * this.columns, numberMines: this.numberOfMines };
  }

  changeDifficulty() {
    let changes: [number, number, number] = this.cellService.Dificultad(this.difficulty);
    this.rows = changes[0];
    this.columns = changes[1];
    this.numberOfMines = changes[2];
    this.reiniciar();
  }
}
