import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarCotizacionComponent } from './pages/buscar-cotizacion/buscar-cotizacion.component';
import { LoginComponent } from './pages/login/login.component';
import { BuscarClientesComponent } from './pages/buscar-clientes/buscar-clientes.component';
import { BuscarProveedoresComponent } from './pages/buscar-proveedores/buscar-proveedores.component';
import { BuscarUsuariosComponent } from './pages/buscar-usuarios/buscar-usuarios.component';
import { BuscarProductosComponent } from './pages/buscar-productos/buscar-productos.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';

const routes: Routes = [
  {
    path: 'ingresar',
    component: LoginComponent
  },
  {
    path: 'buscar-cotizacion',
    component: BuscarCotizacionComponent
  },
  { 
    path: 'buscar-cliente',
    component: BuscarClientesComponent
  },
  { 
    path: 'buscar-proveedor',
    component: BuscarProveedoresComponent
  },
  { 
    path: 'buscar-usuario',
    component: BuscarUsuariosComponent
  },
  { 
    path: 'buscar-producto',
    component: BuscarProductosComponent
  },
  {
    path: 'almacen',
    component: AlmacenComponent
  },
  {
    path: '',
    redirectTo: '/ingresar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
