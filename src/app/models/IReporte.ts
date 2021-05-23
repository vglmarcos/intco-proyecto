export interface IReporte {
    _id?: number,
    id?: number,
    nombre: string,
    periodo: {
        fecha_inicio: Date,
        fecha_fin: Date
    },
    createdAt?: Date,
    updatedAt?: Date
}