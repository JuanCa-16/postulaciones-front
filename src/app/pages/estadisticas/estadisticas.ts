import { Component, inject, OnInit, signal } from '@angular/core';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EstadisticasService } from '../../services/estadisticas-service';
import { RankingEstadisticaDTO } from '../../interfaces/estadistica.interface';
import { Podio } from '../../components/estadisticas/podio/podio';
import { EstadoService } from '../../services/estado-service';
import { Estado } from '../../interfaces/estado.interface';
import { TotalPostulaciones } from '../../components/estadisticas/total-postulaciones/total-postulaciones';
import { PorcentajeEstados } from '../../components/estadisticas/porcentaje-estados/porcentaje-estados';
import { GraficoDias } from '../../components/estadisticas/grafico-dias/grafico-dias';
import { DemoService } from '../../services/demo-service';
import { finalize } from 'rxjs';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-estadisticas',
  imports: [Podio, TotalPostulaciones, PorcentajeEstados, GraficoDias, Header],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas implements OnInit {
  private readonly estadisticasService = inject(EstadisticasService);
  protected readonly demoService = inject(DemoService);
  private readonly estadoService = inject(EstadoService);

  topEmpresas = signal<RankingEstadisticaDTO[]>([]);
  topPaginas = signal<RankingEstadisticaDTO[]>([]);
  idEstado = signal;
  estados = signal<Estado[]>([]);

  cargandoE = signal(false);
  cargandoP = signal(false);

  ngOnInit(): void {
    this.obtenerEstados();
    this.obtenerTopEmpresas('todos');
    this.obtenerTopPaginas('todos');
  }

  obtenerEstados(): void {
    this.estadoService
      .obtenerEstados()

      .subscribe({
        next: (estados) => {
          this.estados.set(estados);
        },
      });
  }

  obtenerTopEmpresas(estadoId: number | 'todos'): void {
    this.cargandoE.set(true);
    this.estadisticasService
      .topEmpresasAplicadas(estadoId)
      .pipe(
        finalize(() => {
          this.cargandoE.set(false);
        }),
      )
      .subscribe({
        next: (resultado) => this.topEmpresas.set(resultado),
      });
  }

  obtenerTopPaginas(estadoId: number | 'todos'): void {
    this.cargandoP.set(true);
    this.estadisticasService
      .topPaginasAplicadas(estadoId)
      .pipe(
        finalize(() => {
          this.cargandoP.set(false);
        }),
      )
      .subscribe({
        next: (resultado) => this.topPaginas.set(resultado),
      });
  }
}
