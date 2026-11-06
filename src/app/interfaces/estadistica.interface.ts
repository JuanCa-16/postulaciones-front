import { Modalidad } from './postulacion.interface';

export interface EstadoEstadisticaDTO {
  estadoId: number;
  nombre: string;
  color: string;
  porDefecto: boolean;
  cantidad: number;
  porcentaje: number;
}

export interface FechaEstadisticaDTO {
  fecha: string; // Formato YYYY-MM-DD
  cantidad: number;
}

export interface ModalidadEstadisticaDTO {
  modalidad: Modalidad;
  cantidad: number;
  porcentaje: number;
}

export interface RankingEstadisticaDTO {
  nombre: string;
  cantidad: number;
}
