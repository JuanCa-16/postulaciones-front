import { Component, inject, OnInit, signal } from '@angular/core';
import { EstadoInput } from '../../components/inputs/estado-input/estado-input';
import { EditarEstado, Estado, EstadoInputEvent } from '../../interfaces/estado.interface';
import { EstadoService } from '../../services/estado-service';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { Header } from '../../components/header/header';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estados',
  standalone: true,
  imports: [EstadoInput, Loading, Header],
  templateUrl: './estados.html',
  styleUrl: './estados.scss',
})
export class Estados implements OnInit {
  private readonly estadoService = inject(EstadoService);
  private readonly toastr = inject(ToastrService);

  estados = signal<Estado[]>([]);
  cargando = signal(false);

  color = signal<string>('#0b0b0b');
  texto = signal<string>('');
  defecto = signal<boolean>(false);

  ngOnInit(): void {
    this.obtenerEstados();
  }

  obtenerEstados(): void {
    this.cargando.set(true);
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
          this.toastr.error(err.error?.message ?? 'Error al obtener tus estados', 'Error');
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

    this.estadoService
      .editarEstado(event.id, payload)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastr.success('Estado editado con éxito', 'Éxito');

          this.obtenerEstados();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al actualizar tus estados', 'Error');
        },
      });
  }

  procesarGuardado(event: EstadoInputEvent): void {
    if (!event.titulo) {
      this.toastr.error('Debes ingresar un nombre al estado', 'Error');
      return;
    }

    this.cargando.set(true);

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
          this.toastr.success('Estado creado con éxito', 'Éxito');

          this.obtenerEstados();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al crear tu estado', 'Error');
        },
      });
  }

  eliminar(id: number): void {
    this.cargando.set(true);

    this.estadoService
      .eliminarEstado(id)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastr.success('Estado eliminado con éxito', 'Éxito');
          this.obtenerEstados();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al eliminar', 'Error');
        },
      });
  }
}
