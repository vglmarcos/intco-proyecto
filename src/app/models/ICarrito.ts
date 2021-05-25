export interface ICarrito {
    id_producto: number,
    dimensiones: {
        ancho: number,
        largo: number
    },
    cantidad: number,
    subtotal: number
}