import { Component, inject, OnInit, signal } from '@angular/core';
import { EstadoInput } from '../../components/inputs/estado-input/estado-input';
import { EditarEstado, Estado, EstadoInputEvent } from '../../interfaces/estado.interface';
import { EstadoService } from '../../services/estado-service';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-estados',
  standalone: true,
  imports: [EstadoInput, Loading],
  templateUrl: './estados.html',
  styleUrl: './estados.scss',
})
export class Estados implements OnInit {
  private readonly estadoService = inject(EstadoService);

  estados = signal<Estado[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  color = signal<string>('#0b0b0b');
  texto = signal<string>('');
  defecto = signal<boolean>(false);

  ngOnInit(): void {
    this.obtenerEstados();
  }

  obtenerEstados(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.estadoService
      .obtenerEstados()
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (estados) => {
          this.estados.set(estados);
        },
        error: (err) => {
          console.error(err);
          this.error.set(err.error?.message ?? 'Error al obtener los estados');
        },
      });
  }

  procesarEdicion(event: EstadoInputEvent): void {
    if (!event.id) return;

    const payload: EditarEstado = {};

    if (event.titulo !== undefined) payload.nombre = event.titulo.trim();
    if (event.color !== undefined) payload.color = event.color;
    if (event.porDefecto !== undefined) payload.porDefecto = event.porDefecto;

    if (Object.keys(payload).length === 0) return;

    this.cargando.set(true);
    this.error.set(null);

    this.estadoService
      .editarEstado(event.id, payload)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.obtenerEstados();
        },
        error: (err) => {
          console.error(err);
          this.error.set(err.error?.message ?? 'Error al actualizar el estado');
        },
      });
  }

  procesarGuardado(event: EstadoInputEvent): void {
    if (!event.titulo) return;

    this.cargando.set(true);
    this.error.set(null);

    this.estadoService
      .crearEstado({
        nombre: event.titulo.trim(),
        color: event.color ?? '#fff',
        porDefecto: event.porDefecto ?? false,
      })
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.obtenerEstados();
        },
        error: (err) => {
          console.error(err);
          this.error.set(err.error?.message ?? 'Error al crear el estado');
        },
      });
  }

  eliminar(id: number): void {
    this.cargando.set(true);
    this.error.set(null);

    this.estadoService
      .eliminarEstado(id)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.obtenerEstados();
        },
        error: (err) => {
          console.error(err);
          this.error.set(err.error?.message ?? 'Error al eliminar');
        },
      });
  }
}
