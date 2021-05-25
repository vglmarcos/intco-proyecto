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

  constructor(public colorThemeService: ColorThemeService, public overlayContainer?: OverlayContainer, private location?: Location, public router?: Router) {
    this.router.events.subscribe(val => {
      switch (this.location.path()) {
        case '/buscar-cotizacion':
          this.title = 'Lista de cotizaciones';
          break;
        case '/buscar-proveedor':
          this.title = 'Lista de proveedores';
          break;
        case '/buscar-cliente':
          this.title = 'Lista de clientes';
          break;
        case '/buscar-almacen':
          this.title = 'Inventario';
          break;
        case '/buscar-usuario':
          this.title = 'Lista de usuarios';
          break;
        case '/buscar-producto':
          this.title = 'Lista de productos';
          break;
        case '/buscar-venta':
          this.title = 'Lista de ventas';
          break;
        case '/buscar-factura':
          this.title = 'Lista de facturas';
          break;
        case '/buscar-reporte':
          this.title = 'Lista de reportes';
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
