import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import {
  EstadoEstadisticaDTO,
  FechaEstadisticaDTO,
  ModalidadEstadisticaDTO,
  RankingEstadisticaDTO,
} from '../interfaces/estadistica.interface';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/estadisticas`;

  totalPostulaciones(): Observable<Number> {
    return this.http
      .get<ApiResponse<Number>>(`${this.apiUrl}/total`)
      .pipe(map((response) => response.data));
  }

  postulacionesPorEstado(): Observable<EstadoEstadisticaDTO[]> {
    return this.http
      .get<ApiResponse<EstadoEstadisticaDTO[]>>(`${this.apiUrl}/estados`)
      .pipe(map((response) => response.data));
  }

  postulacionesPorDia(): Observable<FechaEstadisticaDTO[]> {
    return this.http
      .get<ApiResponse<FechaEstadisticaDTO[]>>(`${this.apiUrl}/diarias`)
      .pipe(map((response) => response.data));
  }

  postulacionesPorModalidad(): Observable<ModalidadEstadisticaDTO[]> {
    return this.http
      .get<ApiResponse<ModalidadEstadisticaDTO[]>>(`${this.apiUrl}/modalidades`)
      .pipe(map((response) => response.data));
  }

  topEmpresasAplicadas(estadoId: number | 'todos' = 'todos'): Observable<RankingEstadisticaDTO[]> {
    let params = new HttpParams();

    if (estadoId !== 'todos') {
      params = params.set('estadoId', estadoId);
    }
    return this.http
      .get<ApiResponse<RankingEstadisticaDTO[]>>(`${this.apiUrl}/top-empresas`, { params })
      .pipe(map((response) => response.data));
  }

  topPaginasAplicadas(estadoId: number | 'todos' = 'todos'): Observable<RankingEstadisticaDTO[]> {
    let params = new HttpParams();

    if (estadoId !== 'todos') {
      params = params.set('estadoId', estadoId);
    }
    return this.http
      .get<ApiResponse<RankingEstadisticaDTO[]>>(`${this.apiUrl}/top-paginas`, { params })
      .pipe(map((response) => response.data));
  }
}
