import { Casilla } from "../models/Casilla";
import { Estado } from "../models/Estado";

export class CasillaService{

    generarTablero(filas: number, columnas: number, minas: number): Casilla[][] {
        let tablero: Casilla[][] = Array.from({ length: filas }, () => this.crearFila(columnas));
        this.generarMinas(minas, tablero);
        this.obtenerMinasAlrededor(tablero);
        return tablero;
      }

    crearFila(columnas: number): Casilla[] {
        return Array.from({ length: columnas }, () => ({ status: 'toOpen', mina: false, minasAlrededor: 0 }));
      }

    generarMinas(minas: number, tablero: Casilla[][]): void {
        const filas = tablero.length;
        const columnas = tablero[0].length;
        const set = new Set<string>();
        while (set.size < minas) {
            const fila = Math.floor(Math.random() * filas);
            const columna = Math.floor(Math.random() * columnas);
            const key = `${fila},${columna}`;
    
            if (!set.has(key)) {
            set.add(key);
            tablero[fila][columna].mina = true;
            }
        }
    }

    verificarMina(tablero: Casilla[][], i: number, j: number, casilla: number[], ) : number
    {
        if(tablero[i + casilla[0]][ j + casilla[1]].mina){ return 1; }
        return 0;
    }

    obtenerMinasAlrededor(tablero: Casilla[][]): void {
    const direcciones = [[1, 1], [-1, -1], [-1, 1], [1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
    const filas = tablero.length;
    const columnas = tablero[0].length;

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (!tablero[i][j].mina) {
          tablero[i][j].minasAlrededor = this.contarMinasAlrededor(i, j, tablero, direcciones);
        }
      }
    }
  }

  contarMinasAlrededor(fila: number, columna: number, tablero: Casilla[][], direcciones: number[][]): number {
    return direcciones.reduce((contador, [dx, dy]) => {
      const nuevaFila = fila + dx;
      const nuevaColumna = columna + dy;
      if (this.validarRango(nuevaFila, nuevaColumna, tablero.length, tablero[0].length) && tablero[nuevaFila][nuevaColumna].mina) {
        return contador + 1;
      }
      return contador;
    }, 0);
  }

    Dificultad(difficulty: string): [number, number, number] {
        switch (difficulty) {
          case "Facil":
            return [8, 8, 12];
          case "Medio":
            return [12, 12, 20];
          case "Dificil":
            return [18, 18, 35];
          default:
            return [50, 50, 100];
        }
      }

    cambiarEstado(board: Casilla[][], row: number, column: number, cellsGame: any, numberOfMines: number, gameEstate: Estado) : Estado{
        
        if(board[row][column].mina){
            board[row][column].status = 'mine';
            this.verificarEstadoCasilla(board);
            return Estado.noactivo;
        }
        else if((cellsGame.cellsOpened) >= (cellsGame.cells - cellsGame.numberMines)){
            return Estado.victoria;
        }
    
        return Estado.activo;
    }

    verificarEstadoCasilla(board: Casilla[][]){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j].mina){
                    board[i][j].status = 'mine';
                }
            }
        }
    }

    validarRango(i: number, j: number, rows: number, columns: number) : boolean{
        if((i < 0 || j < 0) || (i >= rows || j >= columns)){
            return false;
        }
        return true;
    }

    abrirCelda(tablero: Casilla[][], fila: number, columna: number, casillas: any): void {
        if (!this.validarRango(fila, columna, tablero.length, tablero[0].length) || tablero[fila][columna].status === 'open' || tablero[fila][columna].mina) {
          return;
        }
    
        tablero[fila][columna].status = 'open';
        casillas.cellsOpened += 1;
    
        if (tablero[fila][columna].minasAlrededor === 0) {
          const direcciones = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
          direcciones.forEach(([dx, dy]) => this.abrirCelda(tablero, fila + dx, columna + dy, casillas));
        }
      }

}