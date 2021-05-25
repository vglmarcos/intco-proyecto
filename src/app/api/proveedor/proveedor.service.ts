import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProveedor } from 'src/app/models/IProveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private basePath = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  obtenerProveedoresGet() {
    return this.httpClient.request<IProveedor[]>('get', `${this.basePath}/api/proveedor/obtenerProveedores`);
  }

  agregarProveedorPost(proveedor: IProveedor) {
    return this.httpClient.request('post', `${this.basePath}/api/proveedor/agregarProveedor`, {
      body: proveedor
    });
  }

  editarProveedorPut(proveedor: IProveedor) {
    return this.httpClient.request('put', `${this.basePath}/api/proveedor/editarProveedor`, {
      body: proveedor
    });
  }

  eliminarProveedorDelete(proveedor: IProveedor) {
    return this.httpClient.request('delete', `${this.basePath}/api/proveedor/eliminarProveedor`, {
      body: proveedor
    });
  }
}
