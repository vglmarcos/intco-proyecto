import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReporte } from 'src/app/models/IReporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private basePath = "https://api-rest-vitrum.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  obtenerReportesGet() {
    return this.httpClient.request<IReporte[]>('get', `${this.basePath}/api/reporte/obtenerReportes`);
  }

  agregarReportePost(reporte: IReporte) {
    return this.httpClient.request('post', `${this.basePath}/api/reporte/agregarReporte`, {
      body: reporte
    });
  }

  editarReportePut(reporte: IReporte) {
    return this.httpClient.request('put', `${this.basePath}/api/reporte/editarReporte`, {
      body: reporte
    });
  }

  eliminarReporteDelete(reporte: IReporte) {
    return this.httpClient.request('delete', `${this.basePath}/api/reporte/eliminarReporte`, {
      body: reporte
    });
  }
}
