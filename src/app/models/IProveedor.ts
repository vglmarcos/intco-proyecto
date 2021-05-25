export interface IProveedor {
    _id?: number,
    id?: number,
    id_lamina: number,
    id_producto: number,
    nombre: string,
    telefono: string,
    ubicacion: string,
    createdAt?: Date,
    updatedAt?: Date
}