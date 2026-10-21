import { Component, computed, inject, signal } from '@angular/core';
import { Tag } from '../../components/tag/tag';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostulacionService } from '../../services/postulacionService';
import { finalize, forkJoin } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { HistoryCard } from '../../components/history-card/history-card';
import { DatePipe } from '@angular/common';
import { IconPencil } from '../../components/icons/pencil.component';
import { IconTrash } from '../../components/icons/trash.component';
import { DataField } from '../../components/data-field/data-field';
import { ToastrService } from 'ngx-toastr';
import { Modal } from '../../components/modal/modal';
import { IconRow } from '../../components/icons/row.component';
import { DemoService } from '../../services/demo-service';
import { BgStatusService } from '../../services/bg-status-service';
import { ModalContenedor } from '../../components/modal-contenedor/modal-contenedor';
import { EditorNota } from '../../components/editor-nota/editor-nota';
import { NotasService } from '../../services/notas-service';
import { Nota } from '../../interfaces/nota.interface';
import { IconUserComponent } from '../../components/icons/icon-user.component';
import { IconLocationComponent } from '../../components/icons/icon-location.component';
import { IconMoneyComponent } from '../../components/icons/icon-money.component';
import { IconClockComponent } from '../../components/icons/icon-clock.component';
import { IconContractComponent } from '../../components/icons/icon-contract.component';
import { IconPlus } from '../../components/icons/plus.component';

@Component({
  selector: 'app-detalles',
  imports: [
    Tag,
    Loading,
    HistoryCard,
    DatePipe,
    RouterLink,
    IconPencil,
    IconTrash,
    DataField,
    Modal,
    IconRow,
    ModalContenedor,
    EditorNota,
    IconUserComponent,
    IconLocationComponent,
    IconMoneyComponent,
    IconClockComponent,
    IconContractComponent,
    IconPlus,
  ],
  templateUrl: './detalles.html',
  styleUrl: './detalles.scss',
})
export class Detalles {
  private readonly route = inject(ActivatedRoute);
  private readonly postulacionService = inject(PostulacionService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  protected readonly demoService = inject(DemoService);
  private readonly notaService = inject(NotasService);
  protected bgStatusService = inject(BgStatusService);
  cargando = signal(false);
  mostrarNota = signal(false);
  postulacion = signal<Postulacion | undefined>(undefined);
  activarColor = computed(() => this.postulacion()?.estado.color);
  idPostulacion!: number;
  esDemo = this.demoService.estaEnModoDemo();
  nota = signal<Nota | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.router.navigate(['/']);
      return;
    }
    this.idPostulacion = id;
    this.obtenerDetalles(id);
  }

  editar() {
    this.bgStatusService.setStatusColor(this.activarColor()!);
    this.router.navigate(['/editar', this.idPostulacion]);
  }

  obtenerDetalles(id: number): void {
    this.cargando.set(true);

    const postulacion$ = this.esDemo
      ? this.demoService.obtenerDetallePostulacion(id)
      : this.postulacionService.obtenerDetallePostulacion(id);

    const nota$ = this.esDemo ? this.demoService.obtenerNota(id) : this.notaService.obtenerNota(id);

    forkJoin({
      postulacion: postulacion$,
      nota: nota$,
    })
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: ({ postulacion, nota }) => {
          this.postulacion.set(postulacion);
          this.nota.set(nota);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(
            err.error?.message ?? err.message ?? 'Error al obtener el detalle',
            'Error',
          );
          this.router.navigate(['/']);
        },
      });
  }

  eliminarPostulacion(): void {
    if (this.esDemo) {
      this.toastr.warning('No se permite en modo DEMO', 'Advertencia');
      return;
    }

    this.cargando.set(true);

    this.postulacionService
      .eliminarPostulacion(this.idPostulacion)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toastr.success('Postulación eliminada con éxito', 'Eliminada');
        },
        error: (err) => {
          this.toastr.error(err.error?.message ?? 'Error al Eliminar', 'Error');
        },
      });
  }

  mostrarModalEliminar = signal(false);

  // Abre el modal
  abrirModalEliminar() {
    this.mostrarModalEliminar.set(true);
  }

  // Cierra el modal
  cancelarEliminar() {
    this.mostrarModalEliminar.set(false);
  }

  // Confirma la acción de eliminar
  confirmarEliminacion() {
    this.mostrarModalEliminar.set(false);
    this.eliminarPostulacion(); // Tu método existente
  }

  recargarNota(nota: Nota | null) {
    this.mostrarNota.set(false);
    this.nota.set(nota);
  }
}
