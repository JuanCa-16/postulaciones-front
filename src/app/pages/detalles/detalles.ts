import { Component, computed, inject, signal } from '@angular/core';
import { Tag } from '../../components/tag/tag';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostulacionService } from '../../services/postulacionService';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { HistoryCard } from '../../components/history-card/history-card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalles',
  imports: [Tag, Loading, HistoryCard, DatePipe, RouterLink],
  templateUrl: './detalles.html',
  styleUrl: './detalles.scss',
})
export class Detalles {
  private readonly route = inject(ActivatedRoute);
  private readonly postulacionService = inject(PostulacionService);
  private readonly router = inject(Router);

  cargando = signal(false);
  error = signal<string | null>(null);
  postulacion = signal<Postulacion | undefined>(undefined);
  activarColor = computed(() => this.postulacion()?.estado.color);
  idPostulacion!: number;

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
    this.error.set(null);

    this.postulacionService
      .obtenerDetallePostulacion(id)
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
          this.error.set(err.error.message);
          this.router.navigate(['/']);
        },
      });
  }

  eliminarPostulacion(): void {
    this.cargando.set(true);
    this.error.set(null);

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
        },
        error: (err) => {
          this.error.set(err.error.message);
        },
      });
  }

}
