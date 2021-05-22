import { Component, OnInit } from '@angular/core';
import { IOption } from './IOption';
import { opciones } from './opciones';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  color = 'primary';
  color2 = 'primary';
  color3 = 'primary';
  color4 = 'primary';
  color5 = 'primary';
  color6 = 'primary';
  color7 = 'primary';
  color8 = 'primary';
  color9 = 'primary';
  
  public OPCIONES: IOption[] = opciones;

  constructor() { }

  ngOnInit(): void {
  }

}
