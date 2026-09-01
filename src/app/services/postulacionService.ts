import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Postulacion } from '../interfaces/postulacion.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostulacionService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/postulaciones`;

  obtenerPostulaciones(): Observable<Postulacion[]> {
    return this.http
      .get<ApiResponse<Postulacion[]>>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  obtenerDetallePostulacion(id: number): Observable<Postulacion> {
    return this.http
      .get<ApiResponse<Postulacion>>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
}
