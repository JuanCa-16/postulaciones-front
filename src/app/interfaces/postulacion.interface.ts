import { Estado } from './estado.interface ';

export enum Modalidad {
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO',
  PRESENCIAL = 'PRESENCIAL',
}

export interface Postulacion {
  id: number;
  nombreOferta: string;
  nombreEmpresa: string | null;
  url: string | null;
  paginaAplicacion: string | null;
  modalidad: Modalidad | null;
  fecha: string;
  estado: Estado;
}
