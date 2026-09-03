import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserLogin, UserLoginResponse } from '../interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  login(user: UserLogin): Observable<UserLoginResponse> {
    return this.http
      .post<ApiResponse<UserLoginResponse>>(`${this.apiUrl}/login`, user)
      .pipe(map((response) => response.data));
  }
}
