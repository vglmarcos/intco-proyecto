import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from 'src/app/models/ICliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private basePath = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  obtenerClientesGet() {
    return this.httpClient.request<ICliente[]>('get', `${this.basePath}/api/cliente/obtenerClientes`);
  }

  agregarClientePost(cliente: ICliente) {
    return this.httpClient.request('post', `${this.basePath}/api/cliente/agregarCliente`, {
      body: cliente
    });
  }

  editarClientePut(cliente: ICliente) {
    return this.httpClient.request('put', `${this.basePath}/api/cliente/editarCliente`, {
      body: cliente
    });
  }

  eliminarClienteDelete(cliente: ICliente) {
    return this.httpClient.request('delete', `${this.basePath}/api/cliente/eliminarCliente`, {
      body: cliente
    });
  }
}
