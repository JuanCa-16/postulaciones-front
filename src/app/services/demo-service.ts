import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Estado } from '../interfaces/estado.interface';
import { Modalidad, Postulacion } from '../interfaces/postulacion.interface';

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
    // APLICADO
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

    // ─────────────────────────────────────────
    // EN PROCESO
    // ─────────────────────────────────────────

    {
      id: 3,
      nombreOferta: 'Frontend Developer Jr',
      nombreEmpresa: 'Globant',
      url: 'https://www.globant.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-15',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-08-20',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-08-22',
        },
      ],
    },

    {
      id: 4,
      nombreOferta: 'Angular Developer',
      nombreEmpresa: 'Sofka',
      url: 'https://sofka.com.co/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-22',
      estado: this.estados[1],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-08-24',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-08-27',
        },
      ],
    },

    // ─────────────────────────────────────────
    // RECHAZADO
    // ─────────────────────────────────────────

    {
      id: 5,
      nombreOferta: 'Backend Developer Java',
      nombreEmpresa: 'Accenture',
      url: 'https://www.accenture.com/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.PRESENCIAL,
      fecha: '2026-08-05',
      estado: this.estados[2],
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
      id: 6,
      nombreOferta: 'Full Stack Developer Jr',
      nombreEmpresa: 'Rappi',
      url: 'https://www.rappi.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.HIBRIDO,
      fecha: '2026-08-10',
      estado: this.estados[2],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'Rechazado',
          fechaActualizacion: '2026-08-16',
        },
        {
          campoActualizado: 'Modalidad',
          valorAntiguo: 'Remoto',
          valorNuevo: 'Híbrido',
          fechaActualizacion: '2026-08-12',
        },
      ],
    },

    // ─────────────────────────────────────────
    // HV VISTA
    // ─────────────────────────────────────────

    {
      id: 7,
      nombreOferta: 'Frontend Engineer',
      nombreEmpresa: 'Mercado Libre',
      url: 'https://www.mercadolibre.com.co/',
      paginaAplicacion: 'LinkedIn',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-28',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-08-30',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'HV Vista',
          valorNuevo: 'En proceso',
          fechaActualizacion: '2026-09-02',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'En proceso',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-03',
        },
      ],
    },

    {
      id: 8,
      nombreOferta: 'Software Engineer',
      nombreEmpresa: 'EPAM',
      url: 'https://www.epam.com/',
      paginaAplicacion: 'Página de empresa',
      modalidad: Modalidad.REMOTO,
      fecha: '2026-08-30',
      estado: this.estados[3],
      historial: [
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-01',
        },
        {
          campoActualizado: 'Estado',
          valorAntiguo: 'Aplicado',
          valorNuevo: 'HV Vista',
          fechaActualizacion: '2026-09-02',
        },
      ],
    },
  ];

  estaEnModoDemo(): boolean {
    return localStorage.getItem('authMode') === 'demo';
  }

  obtenerEstados(): Observable<Estado[]> {
    return of(this.estados);
  }

  obtenerPostulaciones(): Observable<Postulacion[]> {
    return of(this.postulaciones);
  }

  obtenerDetallePostulacion(id: number): Observable<Postulacion> {
    const postulacion = this.postulaciones.find((postulacion) => postulacion.id === id);

    if (!postulacion) {
      return throwError(() => new Error('Postulación no encontrada'));
    }

    return of(postulacion!);
  }
}
