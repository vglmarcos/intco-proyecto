import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { OverlayContainer } from '@angular/cdk/overlay';
import { ColorThemeService } from 'src/app/services/color-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Temas de colores
  @HostBinding('class') componentCssClass: any;
  public theme: string = '';

  constructor(public colorThemeService: ColorThemeService, public overlayContainer?: OverlayContainer,  private location?: Location, public router?: Router) {
    this.router.events.subscribe(val => {
      switch(this.location.path()) {
        case '/buscar-cotizacion':
          this.title = 'Lista de cotizaciones';
          break;
        default:
          break;
      }
      
    });
    this.colorThemeService.theme.subscribe((theme) => {
      this.theme = theme;
    });
  }

  
  onSetTheme(e: string) {
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
  }


  public title: string = '';
}
