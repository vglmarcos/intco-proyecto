import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BuscarCotizacionComponent } from './pages/buscar-cotizacion/buscar-cotizacion.component';
import { HeaderComponent } from './shared/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgregarCotizacionComponent } from './pages/buscar-cotizacion/agregar-cotizacion/agregar-cotizacion.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { LaminaService } from 'src/app/api/lamina/lamina.service';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { ProveedorService } from 'src/app/api/proveedor/proveedor.service';
import { ReporteService } from 'src/app/api/reporte/reporte.service';
import { VentaService } from 'src/app/api/venta/venta.service';
import { LoginService } from 'src/app/api/login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    BuscarCotizacionComponent,
    HeaderComponent,
    AgregarCotizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    ColorThemeService,
    UsuarioService,
    ClienteService,
    CotizacionService,
    LaminaService,
    ProductoService,
    ProveedorService,
    ReporteService,
    VentaService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
