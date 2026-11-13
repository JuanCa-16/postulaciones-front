import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Estado } from '../interfaces/estado.interface';
import { Modalidad, Postulacion } from '../interfaces/postulacion.interface';
import { Nota } from '../interfaces/nota.interface';
import {
  EstadoEstadisticaDTO,
  FechaEstadisticaDTO,
  ModalidadEstadisticaDTO,
  RankingEstadisticaDTO,
} from '../interfaces/estadistica.interface';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private readonly estados: Estado[] = [
    {
      id: 1,
      nombre: 'Aplicado',
      color: '#3B82F6',
      porDefecto: true,
    },
    {
      id: 4,
      nombre: 'HV Vista',
      color: '#8B5CF6',
      porDefecto: false,
    },
    {
      id: 2,
      nombre: 'En proceso',
      color: '#F59E0B',
      porDefecto: false,
    },
    {
      id: 3,
      nombre: 'Rechazado',
      color: '#EF4444',
      porDefecto: false,
    },
  ];

  private readonly postulaciones: Postulacion[] = [
    // ─────────────────────────────────────────
    // APLICADO (11) - La base más grande (sin respuesta aún / ghosting)
    // ─────────────────────────────────────────
    {
      id: 1,
      nombreOferta: 'Software Developer',
      nombreEmpresa: 'Microsoft',
      url: 'https://www.microsoft.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-08-12',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 2,
      nombreOferta: 'Junior Software Engineer',
      nombreEmpresa: 'IBM',
      url: 'https://www.ibm.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-08-25',
      estado: this.estados[0],
      historial: [
        {
          campoActualizado: 'Modalidad',
          valorAntiguo: 'Presencial',
          valorNuevo: 'Híbrido',
          fechaActualizacion: '2026-08-26',
        },
      ],
    },
    {
      id: 3,
      nombreOferta: 'Backend Developer Java',
      nombreEmpresa: 'Endava',
      url: 'https://www.endava.com/',
      paginaAplicacion: 'Computrabajo',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-09-04',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 4,
      nombreOferta: 'Frontend Developer Jr',
      nombreEmpresa: 'Bancolombia',
      url: 'https://www.bancolombia.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-09-11',
      estado: this.estados[0],
      historial: [
        {
          campoActualizado: 'Modalidad',
          valorAntiguo: 'Presencial',
          valorNuevo: 'Híbrido',
          fechaActualizacion: '2026-09-12',
        },
      ],
    },
    {
      id: 5,
      nombreOferta: 'Desarrollador de Software',
      nombreEmpresa: 'Perficient',
      url: 'https://www.perficient.com/',
      paginaAplicacion: 'Magneto',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-09-19',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 6,
      nombreOferta: 'Full Stack Developer',
      nombreEmpresa: 'Globant',
      url: 'https://www.globant.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-10-03',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 7,
      nombreOferta: 'Junior Backend Developer',
      nombreEmpresa: 'Nexa BPO',
      url: 'https://www.nexabpo.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.PRESENCIAL,
      fecha: '2026-10-09',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 8,
      nombreOferta: 'Desarrollador Java Spring Boot',
      nombreEmpresa: 'Indra',
      url: 'https://www.indracompany.com/',
      paginaAplicacion: 'El Empleo',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-10-14',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 9,
      nombreOferta: 'Full Stack Developer Jr',
      nombreEmpresa: 'Rappi',
      url: 'https://www.rappi.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-10-18',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 10,
      nombreOferta: 'Software Engineer Junior',
      nombreEmpresa: 'IBM',
      url: 'https://www.ibm.com/',
      paginaAplicacion: 'Computrabajo',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-11-05',
      estado: this.estados[0],
      historial: [],
    },
    {
      id: 11,
      nombreOferta: 'Angular Frontend Developer',
      nombreEmpresa: 'Mercado Libre',
      url: 'https://www.mercadolibre.com.co/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-11-10',
      estado: this.estados[0],
      historial: [],
    },

    // ─────────────────────────────────────────
    // HV VISTA (5) - Filtro inicial pasado, pero sin avanzar aún
    // ─────────────────────────────────────────
    {
      id: 12,
      nombreOferta: 'Frontend Engineer',
      nombreEmpresa: 'Mercado Libre',
      url: 'https://www.mercadolibre.com.co/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-28',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-08-30',
        },
      ],
    },
    {
      id: 13,
      nombreOferta: 'Software Engineer',
      nombreEmpresa: 'EPAM',
      url: 'https://www.epam.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-30',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-01',
        },
        {
          campoActualizado: 'Modalidad',
          valorAntiguo: 'Híbrido',
          valorNuevo: 'Remoto',
          fechaActualizacion: '2026-09-02',
        },
      ],
    },
    {
      id: 14,
      nombreOferta: 'Java Developer Junior',
      nombreEmpresa: 'Capgemini',
      url: 'https://www.capgemini.com/',
      paginaAplicacion: 'Computrabajo',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-09-07',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-09',
        },
      ],
    },
    {
      id: 15,
      nombreOferta: 'Desarrollador Angular',
      nombreEmpresa: 'Sofka',
      url: 'https://sofka.com.co/',
      paginaAplicacion: 'Magneto',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-09-15',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-17',
        },
      ],
    },
    {
      id: 16,
      nombreOferta: 'Analista de Desarrollo de Software',
      nombreEmpresa: 'SURA',
      url: 'https://www.sura.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-10-02',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-10-05',
        },
      ],
    },

    // ─────────────────────────────────────────
    // EN PROCESO (2) - Entrevistas o pruebas técnicas activas (embudo estrecho)
    // ─────────────────────────────────────────
    {
      id: 17,
      nombreOferta: 'Angular Developer',
      nombreEmpresa: 'Sofka',
      url: 'https://sofka.com.co/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-10-19',
      estado: this.estados[2],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-10-22',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-10-28',
        },
      ],
    },
    {
      id: 18,
      nombreOferta: 'Desarrollador de Software',
      nombreEmpresa: 'Koombea',
      url: 'https://www.koombea.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-10-27',
      estado: this.estados[2],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-10-30',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-11-04',
        },
      ],
    },

    // ─────────────────────────────────────────
    // RECHAZADO (6) - Descartes en distintas etapas del embudo
    // ─────────────────────────────────────────
    {
      id: 19,
      nombreOferta: 'Backend Developer Java',
      nombreEmpresa: 'Accenture',
      url: 'https://www.accenture.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.PRESENCIAL,
      fecha: '2026-08-05',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-08-08',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-08-18',
        },
      ],
    },
    {
      id: 20,
      nombreOferta: 'Full Stack Developer Jr',
      nombreEmpresa: 'Rappi',
      url: 'https://www.rappi.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-08-10',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Modalidad',
          valorAntiguo: 'Remoto',
          valorNuevo: 'Híbrido',
          fechaActualizacion: '2026-08-12',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-08-16',
        },
      ],
    },
    {
      id: 21,
      nombreOferta: 'Frontend Developer Jr',
      nombreEmpresa: 'Globant',
      url: 'https://www.globant.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-15',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-08-20',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-08-22',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'En proceso',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-09-05',
        },
      ],
    },
    {
      id: 22,
      nombreOferta: 'Junior Software Developer',
      nombreEmpresa: 'TCS',
      url: 'https://www.tcs.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-09-02',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-09-12',
        },
      ],
    },
    {
      id: 23,
      nombreOferta: 'Frontend Developer',
      nombreEmpresa: 'Pragma',
      url: 'https://www.pragma.co/',
      paginaAplicacion: 'Magneto',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-09-21',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-23',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-10-01',
        },
      ],
    },
    {
      id: 24,
      nombreOferta: 'Software Developer Junior',
      nombreEmpresa: 'Capgemini',
      url: 'https://www.capgemini.com/',
      paginaAplicacion: 'Computrabajo',
      modalidad: Modalidad.PRESENCIAL,
      fecha: '2026-10-22',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-10-24',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-10-29',
        },
      ],
    },
  ];
  private readonly notas: Nota = {
    reclutador: 'Juan',
    salario: '3.500.500',
    ubicacion: 'Tulua',
    horario: '9:00',
    tipoContrato: null,
    otros: null,
  };

  estaEnModoDemo(): boolean {
    return localStorage.getItem('authMode') === 'demo';
  }

  obtenerEstados(): Observable<Estado[]> {
    return of(this.estados);
  }

  obtenerPostulaciones(): Observable<Postulacion[]> {
    return of(this.postulaciones);
  }

  obtenerNota(id: number): Observable<Nota | null> {
    return of(this.notas);
  }

  obtenerDetallePostulacion(id: number): Observable<Postulacion> {
    const postulacion = this.postulaciones.find((postulacion) => postulacion.id === id);

    if (!postulacion) {
      return throwError(() => new Error('Postulación no encontrada'));
    }

    return of(postulacion!);
  }

  // ─────────────────────────────────────────
  // ESTADÍSTICAS
  // ─────────────────────────────────────────

  totalPostulaciones(): Observable<number> {
    return of(this.postulaciones.length);
  }

  postulacionesPorEstado(): Observable<EstadoEstadisticaDTO[]> {
    const total = this.postulaciones.length;

    return of(
      this.estados.map((estado) => {
        const cantidad = this.postulaciones.filter((p) => p.estado.id === estado.id).length;

        return {
          estadoId: estado.id,
          nombre: estado.nombre,
          color: estado.color,
          porDefecto: estado.porDefecto,
          cantidad,
          porcentaje: total > 0 ? Math.round((cantidad / total) * 10000) / 100 : 0,
        };
      }),
    );
  }

  postulacionesPorDia(): Observable<FechaEstadisticaDTO[]> {
    const anioActual = new Date().getFullYear();
    const conteo = new Map<string, number>();

    this.postulaciones.forEach((p) => {
      conteo.set(p.fecha, (conteo.get(p.fecha) ?? 0) + 1);
    });

    const resultado: FechaEstadisticaDTO[] = [];

    for (
      let tiempo = Date.UTC(anioActual, 0, 1);
      tiempo < Date.UTC(anioActual + 1, 0, 1);
      tiempo += 86400000
    ) {
      const fecha = new Date(tiempo).toISOString().slice(0, 10);

      resultado.push({
        fecha,
        cantidad: conteo.get(fecha) ?? 0,
      });
    }

    return of(resultado);
  }

  postulacionesPorModalidad(): Observable<ModalidadEstadisticaDTO[]> {
    const total = this.postulaciones.length;
    const modalidades: Modalidad[] = Object.values(Modalidad);

    return of(
      modalidades.map((modalidad) => {
        const cantidad = this.postulaciones.filter((p) => p.modalidad === modalidad).length;

        return {
          modalidad,
          cantidad,
          porcentaje: total > 0 ? Math.round((cantidad / total) * 10000) / 100 : 0,
        };
      }),
    );
  }
  topEmpresasAplicadas(estadoId: number | 'todos' = 'todos'): Observable<RankingEstadisticaDTO[]> {
    return of(this.obtenerRanking((p) => p.nombreEmpresa, estadoId));
  }

  topPaginasAplicadas(estadoId: number | 'todos' = 'todos'): Observable<RankingEstadisticaDTO[]> {
    return of(this.obtenerRanking((p) => p.paginaAplicacion, estadoId));
  }

  private obtenerRanking(
    obtenerNombre: (p: Postulacion) => string | null,
    estadoId: number | 'todos',
  ): RankingEstadisticaDTO[] {
    const filtradas = this.postulaciones.filter(
      (p) => estadoId === 'todos' || p.estado.id === estadoId,
    );

    const conteo = new Map<string, number>();

    filtradas.forEach((p) => {
      const nombre = obtenerNombre(p)?.trim();

      if (!nombre) return;

      conteo.set(nombre, (conteo.get(nombre) ?? 0) + 1);
    });

    return Array.from(conteo.entries())
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad || a.nombre.localeCompare(b.nombre))
      .slice(0, 5);
  }
}
