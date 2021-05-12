import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = '';

  constructor(
    private location: Location,
    public router: Router
  ) { 
    this.router.events.subscribe(val => {
      switch(this.location.path()) {
        case '/buscar-cotizacion':
          this.title = 'Lista de cotizaciones';
          break;
        default:
          break;
      }
    });
  }
}
