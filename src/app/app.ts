import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PingService } from './services/ping-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private pingService = inject(PingService);
  protected readonly title = signal('postulaciones-front');

  ngOnInit(): void {
    // Fuego y olvido: Se ejecuta en 2do plano sin bloquear la UI
    this.pingService.despertarBackend().subscribe();
  }
}
