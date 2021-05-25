import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILamina } from 'src/app/models/ILamina';

@Injectable({
  providedIn: 'root'
})
export class LaminaService {

  private basePath = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  obtenerLaminasGet() {
    return this.httpClient.request<ILamina[]>('get', `${this.basePath}/api/lamina/obtenerLaminas`);
  }

  agregarLaminaPost(lamina: ILamina) {
    return this.httpClient.request('post', `${this.basePath}/api/lamina/agregarLamina`, {
      body: lamina
    });
  }

  editarLaminaPut(lamina: ILamina) {
    return this.httpClient.request('put', `${this.basePath}/api/lamina/editarLamina`, {
      body: lamina
    });
  }

  eliminarLaminaDelete(lamina: ILamina) {
    return this.httpClient.request('delete', `${this.basePath}/api/lamina/eliminarLamina`, {
      body: lamina
    });
  }
}
