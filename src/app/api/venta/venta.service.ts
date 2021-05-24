import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVenta } from 'src/app/models/IVenta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private basePath = "https://api-rest-vitrum.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  obtenerVentasGet() {
    return this.httpClient.request<IVenta[]>('get', `${this.basePath}/api/venta/obtenerVentas`);
  }

  agregarVentaPost(venta: IVenta) {
    return this.httpClient.request('post', `${this.basePath}/api/venta/agregarVenta`, {
      body: venta
    });
  }

  editarVentaPut(venta: IVenta) {
    return this.httpClient.request('put', `${this.basePath}/api/venta/editarVenta`, {
      body: venta
    });
  }

  eliminarVentaDelete(venta: IVenta) {
    return this.httpClient.request('delete', `${this.basePath}/api/venta/eliminarVenta`, {
      body: venta
    });
  }
}
