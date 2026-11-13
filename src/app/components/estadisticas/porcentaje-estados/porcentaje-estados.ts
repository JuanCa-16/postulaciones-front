import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EstadisticasService } from '../../../services/estadisticas-service';
import { EstadoEstadisticaDTO } from '../../../interfaces/estadistica.interface';
import { DemoService } from '../../../services/demo-service';
import { finalize } from 'rxjs';
import { Loading } from '../../loading/loading';

@Component({
  selector: 'app-porcentaje-estados',
  imports: [NgxEchartsDirective, Loading],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './porcentaje-estados.html',
  styleUrl: './porcentaje-estados.scss',
})
export class PorcentajeEstados implements OnInit {
  private readonly estadisticasService = inject(EstadisticasService);
  protected readonly demoService = inject(DemoService);

  estadisticasEstados = signal<EstadoEstadisticaDTO[]>([]);

  cargando = signal(false);
  esDemo = this.demoService.estaEnModoDemo();

  ngOnInit(): void {
    this.obtenerPorEstado();
  }

  private readonly colores = {
    textoPrimario: getComputedStyle(document.documentElement)
      .getPropertyValue('--text-primary')
      .trim(),

    textoSecundario: getComputedStyle(document.documentElement)
      .getPropertyValue('--text-secondary')
      .trim(),

    fondo: getComputedStyle(document.documentElement).getPropertyValue('--background').trim(),

    principal: getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim(),

    borde: getComputedStyle(document.documentElement)
      .getPropertyValue('--input-focused-border')
      .trim(),
  };

  obtenerPorEstado(): void {
    this.cargando.set(true);

    const estadistica$ = this.esDemo
      ? this.demoService.postulacionesPorEstado()
      : this.estadisticasService.postulacionesPorEstado();

    estadistica$
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (resultado) => {
          this.estadisticasEstados.set(resultado);
        },
      });
  }

  option = computed(() => ({
    tooltip: {
      show: false,
    },

    legend: {
      bottom: '5%',
      left: 'center',
      align: 'left', // Alinea el texto respecto al icono de color
      itemGap: 15,
      textStyle: {
        color: this.colores.textoSecundario,
        align: 'left',
      },
    },

    series: [
      {
        name: 'Postulaciones por estado',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],

        avoidLabelOverlap: false,

        itemStyle: {
          borderRadius: 12,
          borderColor: this.colores.fondo,
          borderWidth: 2,
        },

        // Texto central inicial
        label: {
          show: false,
          position: 'center',
        },

        emphasis: {
          scale: true,
          label: {
            show: true,
            formatter: (params: any) => {
              return `{nombre|${params.name}}\n{cantidad|${params.value}}\n{porcentaje|${params.percent}%}`;
            },
            rich: {
              nombre: {
                fontSize: 15,
                fontWeight: 'normal',
                color: this.colores.textoSecundario,
                padding: [0, 0, 8, 0],
              },
              cantidad: {
                fontSize: 28,
                fontWeight: 'bold',
                color: 'inherit',
                padding: [0, 0, 5, 0],
              },
              porcentaje: {
                fontSize: 15,
                color: this.colores.textoSecundario,
              },
            },
          },
        },

        data: this.estadisticasEstados().map((estado) => ({
          value: estado.cantidad,
          name: estado.nombre,
          itemStyle: {
            color: estado.color,
          },
        })),
      },
    ],
  }));
}
