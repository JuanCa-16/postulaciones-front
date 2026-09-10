import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Formulario } from '../../components/formulario/formulario';
import { EstadoService } from '../../services/estado-service';
import { Estado } from '../../interfaces/estado.interface';
import { CrearPostulacion, Postulacion } from '../../interfaces/postulacion.interface';
import { PostulacionService } from '../../services/postulacionService';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BgStatusService } from '../../services/bg-status-service';
import { DemoService } from '../../services/demo-service';

@Component({
  selector: 'app-crear-actualizar',
  imports: [Formulario, Loading],
  templateUrl: './crear-actualizar.html',
  styleUrl: './crear-actualizar.scss',
})
export class CrearActualizar implements OnInit, OnDestroy {
  private readonly estadoService = inject(EstadoService);
  private readonly postulacionService = inject(PostulacionService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private bgStatusService = inject(BgStatusService);
  protected readonly demoService = inject(DemoService);

  postulacion = signal<Postulacion | null>(null);
  idPostulacion!: number;

  estados = signal<Estado[]>([]);
  cargando = signal(false);

  esDemo = this.demoService.estaEnModoDemo();

  ngOnInit(): void {
    this.obtenerEstados();
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idPostulacion = Number(id);
      this.obtenerPostulacion(Number(id));
    }
  }

  ngOnDestroy() {
    this.bgStatusService.setStatusColor(null);
  }

  obtenerEstados(): void {
    this.cargando.set(true);

    const estados$ = this.esDemo
      ? this.demoService.obtenerEstados()
      : this.estadoService.obtenerEstados();

    estados$
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
          this.toastr.error(err.error?.message ?? 'Error al obtener tus estados', 'Error');
        },
      });
  }

  crearPostulacion(postulacion: CrearPostulacion): void {
    if (this.esDemo) {
      this.toastr.warning('No se permite en modo DEMO', 'Advertencia');
      return;
    }
    this.cargando.set(true);
    this.postulacionService
      .crearPostulacion(postulacion)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastr.success('Postulación creada con éxito', 'Éxito');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al crear', 'Error');
        },
      });
  }

  obtenerPostulacion(id: number): void {
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
          this.bgStatusService.setStatusColor(postulacion.estado.color);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al obtener', 'Error');
          this.router.navigate(['/']);
        },
      });
  }

  editarPostulacion(postulacion: CrearPostulacion): void {
    if (this.esDemo) {
      this.toastr.warning('No se permite en modo DEMO', 'Advertencia');
      return;
    }
    this.cargando.set(true);

    this.postulacionService
      .editarPostulacion(this.idPostulacion, postulacion)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastr.success('Postulación actualizada con éxito', 'Éxito');
          this.router.navigate(['/detalles', this.idPostulacion]);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al actualizar', 'Error');
        },
      });
  }
}
