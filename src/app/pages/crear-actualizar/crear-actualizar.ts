import { Component, inject, OnInit, signal } from '@angular/core';
import { Formulario } from '../../components/formulario/formulario';
import { EstadoService } from '../../services/estado-service';
import { Estado } from '../../interfaces/estado.interface';
import { CrearPostulacion, Postulacion } from '../../interfaces/postulacion.interface';
import { PostulacionService } from '../../services/postulacionService';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-actualizar',
  imports: [Formulario, Loading],
  templateUrl: './crear-actualizar.html',
  styleUrl: './crear-actualizar.scss',
})
export class CrearActualizar implements OnInit {
  private readonly estadoService = inject(EstadoService);
  private readonly postulacionService = inject(PostulacionService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  postulacion = signal<Postulacion | null>(null);
  idPostulacion!: number;

  estados = signal<Estado[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.obtenerEstados();
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idPostulacion = Number(id);
      this.obtenerPostulacion(Number(id));
    }
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
          console.log(err);
          this.error.set(err.error.message);
        },
      });
  }

  crearPostulacion(postulacion: CrearPostulacion): void {
    this.cargando.set(true);
    this.error.set(null);
    this.postulacionService
      .crearPostulacion(postulacion)
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
          console.error(err);
          this.error.set(err.error.message);
        },
      });
  }

  obtenerPostulacion(id: number): void {
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
          this.router.navigate(['/']);
        },
      });
  }

  editarPostulacion(postulacion: CrearPostulacion): void {
    this.cargando.set(true);
    this.error.set(null);

    this.postulacionService
      .editarPostulacion(this.idPostulacion, postulacion)
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
          console.error(err);
          this.error.set(err.error?.message ?? 'No se pudo actualizar la postulación');
        },
      });
  }
}
