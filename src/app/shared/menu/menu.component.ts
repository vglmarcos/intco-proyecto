import { Component, OnInit } from '@angular/core';
import { IOpcion } from './IOpcion';
import { opciones } from './opciones';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public OPCIONES: IOpcion[] = opciones;

  constructor() { }

  ngOnInit(): void {
  }

}
