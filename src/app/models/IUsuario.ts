export interface IUsuario {
    _id?: number,
    id?: number,
    nombre: string,
    apellidos: string,
    tipo: string,
    correo: string,
    telefono: string,
    usuario: string,
    contra: string,
    estado?: string,
    createdAt?: Date,
    updatedAt?: Date
}