import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/models/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private basePath = "https://vitrum-app.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  obtenerUsuariosGet() {
    return this.httpClient.request<IUsuario[]>('get', `${this.basePath}/api/usuario/obtenerUsuarios`);
  }

  agregarUsuarioPost(usuario: IUsuario) {
    return this.httpClient.request('post', `${this.basePath}/api/usuario/agregarUsuario`, {
      body: usuario
    });
  }

  editarUsuarioPut(usuario: IUsuario) {
    return this.httpClient.request('put', `${this.basePath}/api/usuario/editarUsuario`, {
      body: usuario
    });
  }

  eliminarUsuarioDelete(usuario: IUsuario) {
    return this.httpClient.request('delete', `${this.basePath}/api/usuario/eliminarUsuario`, {
      body: usuario
    });
  }
}
