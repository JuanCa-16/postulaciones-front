import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Postulacion } from '../interfaces/postulacion.interface';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PostulacionService {
  private apiUrl = 'http://localhost:8080/api/postulaciones';

  constructor(private http: HttpClient) {}

  obtenerPostulaciones(): Observable<ApiResponse<Postulacion[]>> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ApiResponse<Postulacion[]>>(this.apiUrl, { headers });
  }
}
