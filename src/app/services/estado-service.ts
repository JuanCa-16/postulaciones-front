import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CrearEstado, EditarEstado, Estado } from '../interfaces/estado.interface';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/estados`;

  obtenerEstados(): Observable<Estado[]> {
    return this.http.get<ApiResponse<Estado[]>>(this.apiUrl).pipe(map((response) => response.data));
  }

  crearEstado(estado: CrearEstado): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(this.apiUrl, estado);
  }

  editarEstado(id: number, estado: EditarEstado): Observable<Estado> {
    return this.http
      .patch<ApiResponse<Estado>>(`${this.apiUrl}/${id}`, estado)
      .pipe(map((response) => response.data));
  }

  eliminarEstado(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
