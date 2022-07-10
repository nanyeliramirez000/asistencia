import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  API_URL = environment.API_URL;

  public splash: boolean = false;

  constructor() {
    if (this.splash) {
      setTimeout(() => {
        this.splash = false;
      }, 3000);
    }
  }
}
