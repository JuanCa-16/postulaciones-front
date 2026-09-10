import { Component, computed, inject, signal } from '@angular/core';
import { Tag } from '../../components/tag/tag';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostulacionService } from '../../services/postulacionService';
import { finalize } from 'rxjs';
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

  cargando = signal(false);
  postulacion = signal<Postulacion | undefined>(undefined);
  activarColor = computed(() => this.postulacion()?.estado.color);
  idPostulacion!: number;
  esDemo = this.demoService.estaEnModoDemo();

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.router.navigate(['/']);
      return;
    }
    this.idPostulacion = id;
    this.obtenerDetalles(id);
  }

  obtenerDetalles(id: number): void {
    this.cargando.set(true);

    const postulacion$ = this.esDemo
      ? this.demoService.obtenerDetallePostulacion(id)
      : this.postulacionService.obtenerDetallePostulacion(id);

    postulacion$
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (postulacion) => {
          this.postulacion.set(postulacion);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al obtener el detalle', 'Error');
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
}
