import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { PostulacionService } from '../../services/postulacionService';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { Router, RouterLink } from '@angular/router';
import { IconGear } from '../../components/icons/gear.component';
import { IconPlus } from '../../components/icons/plus.component';
import { IconRow } from '../../components/icons/row.component';
import { ToastrService } from 'ngx-toastr';
import { ChipGroup } from '../../components/chip-group/chip-group';
import { Chip } from '../../components/inputs/chip/chip';
import { EstadoService } from '../../services/estado-service';
import { Estado } from '../../interfaces/estado.interface';
@Component({
  selector: 'app-inicio',
  imports: [JobCard, Loading, RouterLink, IconGear, IconPlus, IconRow, ChipGroup, Chip],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  private readonly postulacionService = inject(PostulacionService);
  private readonly estadoService = inject(EstadoService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  postulaciones = signal<Postulacion[]>([]);
  estados = signal<Estado[]>([]);
  estadosSeleccionados = signal<number[]>([]);
  cargando = signal(false);

  ngOnInit(): void {
    this.obtenerPostulaciones();
    this.obtenerEstados();
  }

  obtenerPostulaciones(): void {
    this.cargando.set(true);

    this.postulacionService
      .obtenerPostulaciones()
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (postulaciones) => {
          this.postulaciones.set(postulaciones);
        },

        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al conusltar postulaciones', 'Error');
        },
      });
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
          this.toastr.error(err.error?.message ?? 'Error al consultar estados', 'Error');
        },
      });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  esEstadoSeleccionado(estadoId: number): boolean {
    return this.estadosSeleccionados().includes(estadoId);
  }

  toggleEstado(estadoId: number, estaSeleccionado: boolean): void {
    this.estadosSeleccionados.update((actuales) => {
      if (estaSeleccionado) {
        return [...actuales, estadoId];
      } else {
        return actuales.filter((id) => id !== estadoId);
      }
    });
  }

  postulacionesFiltradas = computed(() => {
    const seleccionados = this.estadosSeleccionados();
    const lista = this.postulaciones();

    // Si no hay ningún estado seleccionado, mostramos todas las postulaciones
    if (seleccionados.length === 0) {
      return lista;
    }

    // Filtra las postulaciones cuyo estado.id esté dentro de los seleccionados
    return lista.filter((p) => p.estado && seleccionados.includes(p.estado.id));
  });
}
