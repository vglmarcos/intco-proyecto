export interface ICotizacion {
    _id?: number,
    id?: number,
    id_empleado: number,
    id_cliente: number,
    carrito: [{
        id_producto: number,
        cantidad: number,
        subtotal: number
    }],
    subtotal: number,
    total: number,
    estado: string,
    createdAt?: Date,
    updatedAt?: Date
}