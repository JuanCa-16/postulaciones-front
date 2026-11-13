import { Component, inject, OnInit, signal } from '@angular/core';
import { EstadisticasService } from '../../../services/estadisticas-service';
import { ModalidadEstadisticaDTO } from '../../../interfaces/estadistica.interface';
import { DemoService } from '../../../services/demo-service';
import { finalize } from 'rxjs';
import { Loading } from '../../loading/loading';

@Component({
  selector: 'app-total-postulaciones',
  imports: [Loading],
  templateUrl: './total-postulaciones.html',
  styleUrl: './total-postulaciones.scss',
})
export class TotalPostulaciones implements OnInit {
  private readonly estadisticasService = inject(EstadisticasService);
  protected readonly demoService = inject(DemoService);

  cantPostulaciones = signal<Number>(0);
  estadisticasPorModalidad = signal<ModalidadEstadisticaDTO[]>([]);

  cargando = signal(false);
  esDemo = this.demoService.estaEnModoDemo();

  ngOnInit(): void {
    this.obtenerTotal();
    this.obtenerPorModalidad();
  }

  obtenerTotal(): void {
    this.cargando.set(true);
    const estadistica$ = this.esDemo
      ? this.demoService.totalPostulaciones()
      : this.estadisticasService.totalPostulaciones();

    estadistica$
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (resultado) => {
          this.cantPostulaciones.set(resultado);
        },
      });
  }

  obtenerPorModalidad(): void {
    const estadistica$ = this.esDemo
      ? this.demoService.postulacionesPorModalidad()
      : this.estadisticasService.postulacionesPorModalidad();

    estadistica$.subscribe({
      next: (resultado) => {
        this.estadisticasPorModalidad.set(resultado);
      },
    });
  }
}
