import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { catchError, of, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth/prueba`;
  private timerSubscription?: Subscription;

  activo = signal<boolean>(false);

  constructor() {
    // Restaurar estado al recargar la aplicación
    const guardado = localStorage.getItem('keep_alive_active');
    if (guardado === 'true') {
      this.activarAutoPing();
    }
  }

  despertarBackend() {
    return this.http.get(this.apiUrl).pipe(
      catchError((err) => {
        console.warn('El backend aún no responde o falló la conexión:', err);
        return of(null);
      }),
    );
  }

  // Alternar encendido/apagado desde el botón
  toggleAutoPing(): void {
    if (this.activo()) {
      this.desactivarAutoPing();
    } else {
      this.activarAutoPing();
    }
  }

  activarAutoPing(): void {
    this.activo.set(true);
    localStorage.setItem('keep_alive_active', 'true');

    // Cancelar cualquier temporizador previo antes de iniciar uno nuevo
    this.detenerTimer();

    // 10 minutos en milisegundos (10 * 60 * 1000)
    const diezMinutosMs = 600000;

    // timer(0, ms) dispara una vez de inmediato y luego repite cada 10 min
    this.timerSubscription = timer(0, diezMinutosMs).subscribe(() => {
      this.despertarBackend().subscribe();
    });
  }

  desactivarAutoPing(): void {
    this.activo.set(false);
    localStorage.setItem('keep_alive_active', 'false');
    this.detenerTimer();
  }

  private detenerTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }
}
