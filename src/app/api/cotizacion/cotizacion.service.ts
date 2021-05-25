import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICotizacion } from 'src/app/models/ICotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private basePath = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  obtenerCotizacionesGet() {
    return this.httpClient.request<ICotizacion[]>('get', `${this.basePath}/api/cotizacion/obtenerCotizaciones`);
  }

  agregarCotizacionPost(cotizacion: ICotizacion) {
    return this.httpClient.request('post', `${this.basePath}/api/cotizacion/agregarCotizacion`, {
      body: cotizacion
    });
  }

  editarCotizacionPut(cotizacion: ICotizacion) {
    return this.httpClient.request('put', `${this.basePath}/api/cotizacion/editarCotizacion`, {
      body: cotizacion
    });
  }

  eliminarClienteDelete(cotizacion: ICotizacion) {
    return this.httpClient.request('delete', `${this.basePath}/api/cotizacion/eliminarCotizacion`, {
      body: cotizacion
    });
  }
}
