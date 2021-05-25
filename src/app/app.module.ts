import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
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
import { EditarCotizacionComponent } from './pages/buscar-cotizacion/editar-cotizacion/editar-cotizacion.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmarEliminarComponent } from './shared/confirmar-eliminar/confirmar-eliminar.component';
import { BuscarClientesComponent } from './pages/buscar-clientes/buscar-clientes.component';
import { BuscarProveedoresComponent } from './pages/buscar-proveedores/buscar-proveedores.component';
import { AgregarProveedorComponent } from './pages/buscar-proveedores/agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from 'src/app/pages/buscar-proveedores/editar-proveedor/editar-proveedor.component';
import { BuscarUsuariosComponent } from 'src/app/pages/buscar-usuarios/buscar-usuarios.component';
import { AgregarUsuarioComponent } from 'src/app/pages/buscar-usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from 'src/app/pages/buscar-usuarios/editar-usuario/editar-usuario.component';
import { BuscarProductosComponent } from 'src/app/pages/buscar-productos/buscar-productos.component';
import { AgregarProductoComponent } from 'src/app/pages/buscar-productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from 'src/app/pages/buscar-productos/editar-producto/editar-producto.component';
import { EditarClientesComponent } from './pages/buscar-clientes/editar-clientes/editar-clientes.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { AgregarLaminaComponent } from './pages/almacen/agregar-lamina/agregar-lamina.component';
import { EditarLaminaComponent } from './pages/almacen/editar-lamina/editar-lamina.component';
import { BuscarVentaComponent } from './pages/buscar-venta/buscar-venta.component';
import { EditarVentaComponent } from './pages/buscar-venta/editar-venta/editar-venta.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    BuscarCotizacionComponent,
    HeaderComponent,
    AgregarCotizacionComponent,
    EditarCotizacionComponent,
    ConfirmarEliminarComponent,
    BuscarClientesComponent,
    BuscarProveedoresComponent,
    AgregarProveedorComponent,
    EditarProveedorComponent,
    BuscarUsuariosComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    BuscarProductosComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    EditarClientesComponent,
    AlmacenComponent,
    AgregarLaminaComponent,
    EditarLaminaComponent,
    BuscarVentaComponent,
    EditarVentaComponent
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
    HttpClientModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSlideToggleModule
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
    LoginService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
