import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Estado } from '../interfaces/estado.interface';
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
}
