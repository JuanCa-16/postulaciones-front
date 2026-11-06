import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EstadisticasService } from '../../services/estadisticas-service';
import {
  EstadoEstadisticaDTO,
  FechaEstadisticaDTO,
  ModalidadEstadisticaDTO,
  RankingEstadisticaDTO,
} from '../../interfaces/estadistica.interface';
import { Podio } from '../../components/estadisticas/podio/podio';
import { EstadoService } from '../../services/estado-service';
import { Estado } from '../../interfaces/estado.interface';

@Component({
  selector: 'app-estadisticas',
  imports: [NgxEchartsDirective, Podio],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas implements OnInit {
  private readonly estadisticasService = inject(EstadisticasService);
  private readonly estadoService = inject(EstadoService);
  cantPostulaciones = signal<Number>(0);
  estadisticasEstados = signal<EstadoEstadisticaDTO[]>([]);
  estadisticasPorModalidad = signal<ModalidadEstadisticaDTO[]>([]);
  estadisticasPorDia = signal<FechaEstadisticaDTO[]>([]);
  topEmpresas = signal<RankingEstadisticaDTO[]>([]);
  topPaginas = signal<RankingEstadisticaDTO[]>([]);
  idEstado = signal;
  estados = signal<Estado[]>([]);

  ngOnInit(): void {
    this.obtenerTotal();
    this.obtenerPorModalidad();
    this.obtenerPorEstado();
    this.obtenerPorDia();

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

  obtenerTotal(): void {
    this.estadisticasService.totalPostulaciones().subscribe({
      next: (resultado) => {
        this.cantPostulaciones.set(resultado);
      },
    });
  }

  obtenerPorEstado(): void {
    this.estadisticasService.postulacionesPorEstado().subscribe({
      next: (resultado) => {
        this.estadisticasEstados.set(resultado);
      },
    });
  }

  obtenerPorDia(): void {
    this.estadisticasService.postulacionesPorDia().subscribe({
      next: (resultado) => {
        this.estadisticasPorDia.set(resultado);
      },
    });
  }

  obtenerPorModalidad(): void {
    this.estadisticasService.postulacionesPorModalidad().subscribe({
      next: (resultado) => {
        this.estadisticasPorModalidad.set(resultado);
      },
    });
  }

  obtenerTopEmpresas(estadoId: number | 'todos'): void {
    this.estadisticasService.topEmpresasAplicadas(estadoId).subscribe({
      next: (resultado) => this.topEmpresas.set(resultado),
    });
  }

  obtenerTopPaginas(estadoId: number | 'todos'): void {
    this.estadisticasService.topPaginasAplicadas(estadoId).subscribe({
      next: (resultado) => this.topPaginas.set(resultado),
    });
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

  optionDias = computed(() => {
    const datos = this.estadisticasPorDia();

    const anio = datos.length
      ? datos[0].fecha.substring(0, 4)
      : new Date().getFullYear().toString();

    const colorBase = this.colores.principal; // Tu color principal dinámico

    const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
      let c = hex.replace('#', '');
      if (c.length === 3)
        c = c
          .split('')
          .map((ch) => ch + ch)
          .join('');
      const num = parseInt(c, 16);
      const r = ((num >> 16) & 255) / 255;
      const g = ((num >> 8) & 255) / 255;
      const b = (num & 255) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      let h = 0;
      const l = (max + min) / 2;
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

      if (d !== 0) {
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
        if (h < 0) h += 360;
      }
      return { h, s: s * 100, l: l * 100 };
    };

    // Mantiene el tono y la saturación; solo sube la luminosidad
    const tintColor = (hex: string, weight: number): string => {
      const { h, s, l } = hexToHsl(hex);
      const nuevaL = l + (92 - l) * weight; // 92% = casi blanco, pero nunca blanco puro
      const nuevaS = Math.min(100, s + 10); // un poco más de saturación para que no se vea apagado
      return `hsl(${Math.round(h)}, ${Math.round(nuevaS)}%, ${Math.round(nuevaL)}%)`;
    };
    return {
      tooltip: {
        formatter: (params: any) => {
          const fecha = new Date(params.value[0] + 'T00:00:00').toLocaleDateString('es-CO', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          return `
      <strong>${fecha}</strong><br/>
      ${params.value[1]} postulaciones
    `;
        },
      },
      visualMap: {
        type: 'piecewise', // <--- Cambiamos a modo por piezas/intervalos
        show: true, // Puedes ponerlo en true para que aparezca una leyenda visual de los rangos
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        textStyle: {
          borderWidth: 0,
          borderColor: this.colores.fondo,
          color: this.colores.textoSecundario, // <--- Aquí cambias el color del texto global de la leyenda
        },
        outOfRange: {
          color: this.colores.fondo, // color de las celdas desactivadas
        },
        pieces: [
          { value: 0, color: this.colores.borde, label: '0' },
          { gte: 1, lte: 3, color: tintColor(colorBase, 0.95), label: '1-3' },
          { gte: 4, lte: 5, color: tintColor(colorBase, 0.8), label: '4-5' },
          { gte: 6, color: tintColor(colorBase, 0.7), label: '6+' },
        ],
      },

      calendar: {
        range: anio,
        cellSize: ['auto', 16],
        left: 35,
        right: 20,
        top: 70,
        bottom: 50,
        orient: 'horizontal',

        splitLine: {
          show: false,
          lineStyle: {
            width: 0,
          },
        },

        yearLabel: {
          show: true,
          position: 'top',
          margin: 35,
          color: this.colores.textoSecundario,
          fontSize: 14,
          fontWeight: 'bold',
        },

        monthLabel: {
          nameMap: [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic',
          ],
          color: this.colores.textoSecundario,
        },

        dayLabel: {
          firstDay: 1,
          nameMap: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
          color: this.colores.textoSecundario,
        },

        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent',
          color: 'transparent',
        },
      },

      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: datos.map((dia) => [dia.fecha, dia.cantidad]),
          itemStyle: {
            borderWidth: 3,
            borderColor: this.colores.fondo,
            borderRadius: 4,
          },
          emphasis: {
            itemStyle: {
              color: this.colores.principal,
              borderWidth: 3,
              borderColor: this.colores.fondo,
              borderRadius: 4,
            },
          },
        },
      ],
    };
  });
}
