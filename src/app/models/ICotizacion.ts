import { ICarrito } from "./ICarrito";

export interface ICotizacion {
    _id?: number,
    id?: number,
    id_usuario: number,
    id_cliente: number,
    carrito: ICarrito[],
    subtotal: number,
    total: number,
    estado: string,
    createdAt?: Date,
    updatedAt?: Date
}