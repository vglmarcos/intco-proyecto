import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private USUARIOS: IUsuario[];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.USUARIOS = usuarios;
    });
  }

  iniciarSesion(usuario: string, password: string) {
    if(this.USUARIOS) {
      const existeUsuario = this.USUARIOS.find(user => (user.usuario == usuario && user.contra == password));
      if(existeUsuario) return true;
    }
    return false;
  }
}
