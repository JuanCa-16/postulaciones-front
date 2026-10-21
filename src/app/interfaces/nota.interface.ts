export interface Nota {
  reclutador: string | null;
  salario: string | null;
  ubicacion: string | null;
  horario: string | null;
  tipoContrato: string | null;
  otros: string | null;
  fechaActualizacion?: string;
}
