import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFactura } from 'src/app/models/IFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private basePath = "https://vitrum-app.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  obtenerFacturasGet() {
    return this.httpClient.request<IFactura[]>('get', `${this.basePath}/api/factura/obtenerFacturas`);
  }

  agregarFacturaPost(factura: IFactura) {
    return this.httpClient.request('post', `${this.basePath}/api/factura/agregarFactura`, {
      body: factura
    });
  }

  editarFacturaPut(factura: IFactura) {
    return this.httpClient.request('put', `${this.basePath}/api/factura/editarFactura`, {
      body: factura
    });
  }

  eliminarFacturaDelete(factura: IFactura) {
    return this.httpClient.request('delete', `${this.basePath}/api/factura/eliminarFactura`, {
      body: factura
    });
  }
}
