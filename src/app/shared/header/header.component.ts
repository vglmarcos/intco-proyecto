import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { ColorThemeService } from 'src/app/services/color-theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  color = 'primary';
  public actualTheme: string;
  private themeOption: string;
  private dark = 'dark';
  private light = 'light';
  public colorOption: string;

  @HostBinding('class') componentCssClass: any;

  //https://stackoverflow.com/questions/63101535/change-css-variables-dynamically-in-angular

  @Input('title')
  public title: string = '';

  constructor(
    public colorThemeService: ColorThemeService,
    private location: Location,
    private router: Router,
  ) {
    this.colorThemeService.theme.subscribe((theme) => {
      this.actualTheme = theme;
    });
  }

  ngOnInit(): void { }

  logout(): void {
    this.router.navigate(['/ingresar']);
    console.log('Logout');
  }

  changeMode(){
    console.log(this.actualTheme)
    switch(this.actualTheme){
      case 'light-cyan-theme': this.themeOption = 'dark-cyan-theme'; break;
      case 'dark-cyan-theme': this.themeOption = 'light-cyan-theme'; break;
      case 'light-blue-theme': this.themeOption = 'dark-blue-theme'; break;
      case 'dark-blue-theme': this.themeOption = 'light-blue-theme'; break;
      case 'light-purple-theme': this.themeOption = 'dark-purple-theme'; break;
      case 'dark-purple-theme': this.themeOption = 'light-purple-theme'; break;
      case 'light-pink-theme': this.themeOption = 'dark-pink-theme'; break;
      case 'dark-pink-theme': this.themeOption = 'light-pink-theme'; break;
      case 'light-orange-theme': this.themeOption = 'dark-orange-theme'; break;
      case 'dark-orange-theme': this.themeOption = 'light-orange-theme'; break;
      case 'light-teal-theme': this.themeOption = 'dark-teal-theme'; break;
      case 'dark-teal-theme': this.themeOption = 'light-teal-theme'; break;
      case 'light-green-theme': this.themeOption = 'dark-green-theme'; break;
      case 'dark-green-theme': this.themeOption = 'light-green-theme'; break;
      case 'light-gray-theme': this.themeOption = 'dark-gray-theme'; break;
      case 'dark-gray-theme': this.themeOption = 'light-gray-theme'; break;
    }
    this.onSetTheme(this.themeOption)
  }

  onChangeColor(colorOption){
    if(this.actualTheme.includes(this.dark)){
      switch(colorOption){
        case 'cyan': this.themeOption = 'dark-cyan-theme'; break;
        case 'blue': this.themeOption = 'dark-blue-theme'; break;
        case 'purple': this.themeOption = 'dark-purple-theme'; break;
        case 'pink': this.themeOption = 'dark-pink-theme'; break;
        case 'orange': this.themeOption = 'dark-orange-theme'; break;
        case 'teal': this.themeOption = 'dark-teal-theme'; break;
        case 'green': this.themeOption = 'dark-green-theme'; break;
        case 'gray': this.themeOption = 'dark-gray-theme'; break;
        
      }
    }
    if(this.actualTheme.includes(this.light)){
      switch(colorOption){
        case 'cyan': this.themeOption = 'light-cyan-theme'; break;
        case 'blue': this.themeOption = 'light-blue-theme'; break;
        case 'purple': this.themeOption = 'light-purple-theme'; break;
        case 'pink': this.themeOption = 'light-pink-theme'; break;
        case 'orange': this.themeOption = 'light-orange-theme'; break;
        case 'teal': this.themeOption = 'light-teal-theme'; break;
        case 'green': this.themeOption = 'light-green-theme'; break;
        case 'gray': this.themeOption = 'light-gray-theme'; break;
      }
    }
    console.log(this.themeOption);
    this.onSetTheme(this.themeOption);
  }

  onSetTheme(theme: string) {
    this.colorThemeService.theme = theme;
  }

}
