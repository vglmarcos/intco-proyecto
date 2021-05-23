export interface IProveedor {
    _id?: number,
    id?: number,
    id_lamina: number,
    id_producto: number,
    nombre: string,
    telefono: string,
    horario: {
        hora_inicio: Date,
        hora_fin: Date
    },
    ubicacion: string,
    createdAt?: Date,
    updatedAt?: Date
}