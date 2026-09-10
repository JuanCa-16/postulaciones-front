import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { PostulacionService } from '../../services/postulacionService';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { finalize, forkJoin } from 'rxjs';
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
import { PingService } from '../../services/ping-service';
import { IconTrash } from '../../components/icons/trash.component';
import { DemoService } from '../../services/demo-service';
import { Tag } from "../../components/tag/tag";
@Component({
  selector: 'app-inicio',
  imports: [JobCard, Loading, RouterLink, IconGear, IconPlus, IconRow, ChipGroup, Chip, IconTrash, Tag],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  private readonly postulacionService = inject(PostulacionService);
  private readonly estadoService = inject(EstadoService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  protected readonly pingService = inject(PingService);
  protected readonly demoService = inject(DemoService);

  postulaciones = signal<Postulacion[]>([]);
  estados = signal<Estado[]>([]);
  estadosSeleccionados = signal<number[]>([]);
  cargando = signal(false);
  busqueda = signal<string>('');

  ngOnInit(): void {
    // this.obtenerPostulaciones();
    // this.obtenerEstados();
    this.cargarDatosIniciales();
  }

  limpiar() {
    this.busqueda.set('');
  }

  // obtenerPostulaciones(): void {
  //   this.cargando.set(true);

  //   this.postulacionService
  //     .obtenerPostulaciones()
  //     .pipe(
  //       finalize(() => {
  //         this.cargando.set(false);
  //       }),
  //     )
  //     .subscribe({
  //       next: (postulaciones) => {
  //         this.postulaciones.set(postulaciones);
  //       },

  //       error: (err) => {
  //         console.error(err);
  //         this.toastr.error(err.error?.message ?? 'Error al conusltar postulaciones', 'Error');
  //       },
  //     });
  // }

  // obtenerEstados(): void {
  //   this.cargando.set(true);

  //   this.estadoService
  //     .obtenerEstados()
  //     .pipe(
  //       finalize(() => {
  //         this.cargando.set(false);
  //       }),
  //     )
  //     .subscribe({
  //       next: (estados) => {
  //         this.estados.set(estados);
  //       },

  //       error: (err) => {
  //         console.error(err);
  //         this.toastr.error(err.error?.message ?? 'Error al consultar estados', 'Error');
  //       },
  //     });
  // }

  cargarDatosIniciales(): void {
    this.cargando.set(true);
    const esDemo = this.demoService.estaEnModoDemo();

    forkJoin({
      postulaciones: esDemo
        ? this.demoService.obtenerPostulaciones()
        : this.postulacionService.obtenerPostulaciones(),
      estados: esDemo ? this.demoService.obtenerEstados() : this.estadoService.obtenerEstados(),
    })
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: ({ postulaciones, estados }) => {
          this.postulaciones.set(postulaciones);
          this.estados.set(estados);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error al cargar la información inicial', 'Error');
        },
      });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('authMode');
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

  actualizarBusqueda(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.busqueda.set(valor);
  }

  postulacionesFiltradas = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();
    const seleccionados = this.estadosSeleccionados();
    let lista = this.postulaciones();

    // Filtro 1: Por texto (nombre de la oferta o empresa)
    if (texto) {
      lista = lista.filter((p) => {
        const ofertaMatch = p.nombreOferta?.toLowerCase().includes(texto);
        const empresaMatch = p.nombreEmpresa?.toLowerCase().includes(texto);
        return ofertaMatch || empresaMatch;
      });
    }

    // Filtro 2: Por chips de estado
    if (seleccionados.length > 0) {
      lista = lista.filter((p) => p.estado && seleccionados.includes(p.estado.id));
    }

    return lista;
  });
}
