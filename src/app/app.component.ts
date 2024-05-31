import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  difficulty: string = '';

  onDifficultySelected(dificultad: string) {
    this.difficulty = dificultad;
  }
}
