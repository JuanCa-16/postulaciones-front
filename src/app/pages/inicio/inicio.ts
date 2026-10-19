import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { PostulacionService } from '../../services/postulacionService';
import { Modalidad, Postulacion } from '../../interfaces/postulacion.interface';
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
import { Tag } from '../../components/tag/tag';
import { ThemeService } from '../../services/theme-service';
import { IconSun } from '../../components/icons/icon-sun.component';
import { IconMoon } from '../../components/icons/icon-moon.component';
import { BgStatusService } from '../../services/bg-status-service';
import { ModalContenedor } from '../../components/modal-contenedor/modal-contenedor';

export type CriterioBusqueda = 'TODO' | 'OFERTA' | 'EMPRESA' | 'PAGINA';

@Component({
  selector: 'app-inicio',
  imports: [
    JobCard,
    Loading,
    RouterLink,
    IconGear,
    IconPlus,
    IconRow,
    ChipGroup,
    Chip,
    IconTrash,
    Tag,
    IconSun,
    IconMoon,
    ModalContenedor,
  ],
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
  protected readonly themeService = inject(ThemeService);
  protected bgStatusService = inject(BgStatusService);
  protected readonly Modalidad = Modalidad;

  mostrarFiltros = signal(false);
  cantidadFiltrosActivos = computed(
    () => this.estadosSeleccionados().length + this.modalidadesSeleccionadas().length,
  );
  postulaciones = signal<Postulacion[]>([]);
  estados = signal<Estado[]>([]);
  estadosSeleccionados = signal<number[]>([]);
  cargando = signal(false);
  busqueda = signal<string>('');
  modalidadesSeleccionadas = signal<Modalidad[]>([]);
  criterioBusqueda = signal<CriterioBusqueda>('TODO');

  setCriterioBusqueda(criterio: CriterioBusqueda): void {
    this.criterioBusqueda.set(criterio);
  }

  ngOnInit(): void {
    // this.obtenerPostulaciones();
    // this.obtenerEstados();
    this.bgStatusService.setStatusColor(null);
    this.cargarDatosIniciales();
  }

  limpiar() {
    this.busqueda.set('');
  }

  limpiarFiltros(): void {
    this.estadosSeleccionados.set([]);
    this.modalidadesSeleccionadas.set([]);
    this.criterioBusqueda.set('TODO');
  }

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

  esModalidadSeleccionado(mod: Modalidad): boolean {
    return this.modalidadesSeleccionadas().includes(mod);
  }

  toggleModalidad(mod: Modalidad, estaSeleccionado: boolean): void {
    this.modalidadesSeleccionadas.update((actuales) => {
      if (estaSeleccionado) {
        return [...actuales, mod];
      } else {
        return actuales.filter((m) => m !== mod);
      }
    });
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
    const criterio = this.criterioBusqueda();
    const seleccionados = this.estadosSeleccionados();
    const modalidadesSeleccionadas = this.modalidadesSeleccionadas();
    let lista = this.postulaciones();

    // Filtro 1: Por texto (nombre de la oferta o empresa)
    if (texto) {
      const palabrasBusqueda = texto.split(/\s+/);

      lista = lista.filter((p) => {
        const oferta = p.nombreOferta?.toLowerCase() || '';
        const empresa = p.nombreEmpresa?.toLowerCase() || '';
        const pag = p.paginaAplicacion?.toLowerCase() || '';

        // Dependiendo del criterio, construimos el texto donde se va a buscar
        let textoDondeBuscar = '';
        if (criterio === 'TODO') {
          textoDondeBuscar = `${oferta} ${empresa} ${pag}`;
        } else if (criterio === 'OFERTA') {
          textoDondeBuscar = oferta;
        } else if (criterio === 'EMPRESA') {
          textoDondeBuscar = empresa;
        } else if (criterio === 'PAGINA') {
          textoDondeBuscar = pag;
        }

        // Verificamos que todas las palabras estén en ese campo/s específico/s
        return palabrasBusqueda.every((palabra) => textoDondeBuscar.includes(palabra));
      });
    }

    // Filtro 2: Por chips de estado
    if (seleccionados.length > 0) {
      lista = lista.filter((p) => p.estado && seleccionados.includes(p.estado.id));
    }

    // Filtro 3: Por chips de modalidad (NUEVO)
    if (modalidadesSeleccionadas.length > 0) {
      lista = lista.filter((p) => p.modalidad && modalidadesSeleccionadas.includes(p.modalidad));
    }

    return lista;
  });
}
