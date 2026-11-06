import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CrearPostulacion, Postulacion } from '../interfaces/postulacion.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostulacionService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/postulaciones`;

  postulaciones = signal<Postulacion[]>([]);

  obtenerPostulaciones(): Observable<Postulacion[]> {
    if (this.postulaciones().length > 0) {
      return of(this.postulaciones());
    }
    return this.http.get<ApiResponse<Postulacion[]>>(this.apiUrl).pipe(
      map((response) => response.data),
      tap((postulaciones) => this.postulaciones.set(postulaciones)),
    );
  }

  limpiarPostulaciones(): void {
    this.postulaciones.set([]);
  }
  
  obtenerDetallePostulacion(id: number): Observable<Postulacion> {
    return this.http
      .get<ApiResponse<Postulacion>>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  crearPostulacion(postulacion: CrearPostulacion): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(this.apiUrl, postulacion);
  }

  eliminarPostulacion(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  editarPostulacion(id: number, postulacion: CrearPostulacion): Observable<Postulacion> {
    return this.http
      .patch<ApiResponse<Postulacion>>(`${this.apiUrl}/${id}`, postulacion)
      .pipe(map((response) => response.data));
  }
}
