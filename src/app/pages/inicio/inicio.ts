import { Component, inject, OnInit, signal } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { PostulacionService } from '../../services/postulacionService';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { Router, RouterLink } from '@angular/router';
import { IconGear } from '../../components/icons/gear.component';
import { IconPlus } from '../../components/icons/plus.component';
@Component({
  selector: 'app-inicio',
  imports: [JobCard, Loading, RouterLink, IconGear, IconPlus],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  private readonly postulacionService = inject(PostulacionService);
  private readonly router = inject(Router);

  postulaciones = signal<Postulacion[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.obtenerPostulaciones();
  }

  obtenerPostulaciones(): void {
    this.cargando.set(true);
    this.error.set(null);

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
          this.error.set(err.error.message);
        },
      });
  }

  eliminarPostulacion(id: number): void {
    this.cargando.set(true);
    this.error.set(null);

    this.postulacionService
      .eliminarPostulacion(id)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.postulaciones.update((postulaciones) =>
            postulaciones.filter((postulacion) => postulacion.id !== id),
          );
        },
        error: (err) => {
          this.error.set(err.error.message);
        },
      });
  }
}
