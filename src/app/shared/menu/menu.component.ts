import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from './IOption';
import { opciones } from './opciones';
import { ColorThemeService } from 'src/app/services/color-theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public actualTheme: string
  public buttonColorMode: string;
  public themeOption: string;
  
  public OPCIONES: IOption[] = opciones;

  constructor(
    public colorThemeService: ColorThemeService,
    private router: Router,
  ) { 
      this.colorThemeService.theme.subscribe((theme) => {
      this.actualTheme = theme;
      this.viewColor();
    });
  }

  ngOnInit(): void {
  }

  viewColor() {
    console.log(this.actualTheme)
    switch(this.actualTheme){
      case 'light-cyan-theme': this.themeOption = 'light-cyan-theme'; this.buttonColorMode = 'light-cyan-button'; break;
      case 'dark-cyan-theme': this.themeOption = 'dark-cyan-theme'; this.buttonColorMode = 'dark-cyan-button'; break;
      case 'light-blue-theme': this.themeOption = 'light-blue-theme'; this.buttonColorMode = 'light-blue-button'; break;
      case 'dark-blue-theme': this.themeOption = 'dark-blue-theme'; this.buttonColorMode = 'dark-blue-button'; break;
      case 'light-purple-theme': this.themeOption = 'light-purple-theme'; this.buttonColorMode = 'light-purple-button';break;
      case 'dark-purple-theme': this.themeOption = 'dark-purple-theme'; this.buttonColorMode = 'dark-purple-button'; break;
      case 'light-pink-theme': this.themeOption = 'light-pink-theme'; this.buttonColorMode = 'light-pink-button'; break;
      case 'dark-pink-theme': this.themeOption = 'dark-pink-theme'; this.buttonColorMode = 'dark-pink-button'; break;
      case 'light-orange-theme': this.themeOption = 'light-orange-theme'; this.buttonColorMode = 'light-orange-button'; break;
      case 'dark-orange-theme': this.themeOption = 'dark-orange-theme'; this.buttonColorMode = 'dark-orange-button'; break;
      case 'light-teal-theme': this.themeOption = 'light-teal-theme'; this.buttonColorMode = 'light-teal-button'; break;
      case 'dark-teal-theme': this.themeOption = 'dark-teal-theme'; this.buttonColorMode = 'dark-teal-button'; break;
      case 'light-green-theme': this.themeOption = 'light-green-theme'; this.buttonColorMode = 'light-green-button'; break;
      case 'dark-green-theme': this.themeOption = 'dark-green-theme'; this.buttonColorMode = 'dark-green-button'; break;
      case 'light-gray-theme': this.themeOption = 'light-gray-theme'; this.buttonColorMode = 'light-gray-button'; break;
      case 'dark-gray-theme': this.themeOption = 'dark-gray-theme'; this.buttonColorMode = 'dark-gray-button'; break;
    }
  }

  onNavigate(ruta: string){
    this.router.navigate([ruta]);
  }

}
