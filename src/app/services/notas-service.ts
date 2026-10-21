import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Nota } from '../interfaces/nota.interface';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/postulaciones`;

  obtenerNota(id: number): Observable<Nota> {
    return this.http
      .get<ApiResponse<Nota>>(`${this.apiUrl}/${id}/nota`)
      .pipe(map((response) => response.data));
  }

  guardarNota(id: number, nota: Nota): Observable<Nota> {
    return this.http
      .put<ApiResponse<Nota>>(`${this.apiUrl}/${id}/nota`, nota)
      .pipe(map((response) => response.data));
  }
}
