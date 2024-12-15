// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentView: 'lugares' | 'usuarios' |'explorados' = 'lugares';

  constructor() {}

  showLugares() {
    this.currentView = 'lugares';
  }

  showUsuarios() {
    this.currentView = 'usuarios';
  }

  showExplorados() {
    this.currentView = 'explorados';
  }
}
