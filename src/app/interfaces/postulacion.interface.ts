import { Estado } from './estado.interface';

export enum Modalidad {
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO',
  PRESENCIAL = 'PRESENCIAL',
}

export interface Historial {
  campoActualizado: string;
  valorAntiguo: string | null;
  valorNuevo: string;
  fechaActualizacion: string;
}

export interface Postulacion {
  id: number;
  nombreOferta: string;
  nombreEmpresa: string | null;
  url: string | null;
  paginaAplicacion: string | null;
  modalidad: Modalidad;
  fecha: string;
  estado: Estado;
  historial?: Historial[];
}

export interface CrearPostulacion {
  nombreOferta: string;
  nombreEmpresa: string | null;
  url: string | null;
  paginaAplicacion: string | null;
  modalidad: Modalidad;
  estadoId: number;
}
