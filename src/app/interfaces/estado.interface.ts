export interface Estado {
  id: number;
  nombre: string;
  color: string;
  porDefecto: boolean;
}
export interface CrearEstado {
  nombre: string;
  color: string;
  porDefecto: boolean;
}

export type EditarEstado = Partial<CrearEstado>;

// Evento que emite el componente formulario/input hacia el padre
export interface EstadoInputEvent {
  id?: number;
  titulo?: string;
  color?: string;
  porDefecto?: boolean;
}
