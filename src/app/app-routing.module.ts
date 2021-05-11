import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarCotizacionComponent } from './pages/buscar-cotizacion/buscar-cotizacion.component';
import { LoginComponent } from './pages/login/login.component';


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
