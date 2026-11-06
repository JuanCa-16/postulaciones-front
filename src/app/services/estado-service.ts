import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { CrearEstado, EditarEstado, Estado } from '../interfaces/estado.interface';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/estados`;

  estados = signal<Estado[]>([]);

  obtenerEstados(): Observable<Estado[]> {
    if (this.estados().length > 0) {
      return of(this.estados());
    }

    return this.http.get<ApiResponse<Estado[]>>(this.apiUrl).pipe(
      map((response) => response.data),
      tap((estados) => this.estados.set(estados)),
    );
  }

  limpiarEstados(): void {
    this.estados.set([]);
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
