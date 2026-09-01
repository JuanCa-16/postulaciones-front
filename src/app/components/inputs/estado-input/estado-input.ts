import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../tag/tag';
import { EstadoInputEvent } from '../../../interfaces/estado.interface';

@Component({
  selector: 'app-estado-input',
  standalone: true,
  imports: [Tag, FormsModule],
  templateUrl: './estado-input.html',
  styleUrl: './estado-input.scss',
})
export class EstadoInput {
  id = input<number>();
  placeholder = input<string>('Título');

  tituloInicial = input<string>('Título');
  colorInicial = input<string>('#000000');
  porDefectoInicial = input<boolean>(false);

  titulo = linkedSignal({
    source: this.tituloInicial,
    computation: (val) => val,
  });

  color = linkedSignal({
    source: this.colorInicial,
    computation: (val) => val,
  });

  porDefecto = linkedSignal({
    source: this.porDefectoInicial,
    computation: (val) => val,
  });

  alGuardar = output<EstadoInputEvent>();
  alCambiarDefecto = output<EstadoInputEvent>();
  alEliminar = output<number>();

  mostrarEliminar = input<boolean>(true);

  haCambiado = computed(() => {
    return this.titulo() !== this.tituloInicial() || this.color() !== this.colorInicial();
  });

  guardar(): void {
    this.alGuardar.emit({
      id: this.id(),
      titulo: this.titulo(),
      color: this.color(),
      porDefecto: this.porDefecto(),
    });

    if (!this.id()) {
      this.titulo.set(this.tituloInicial());
      this.color.set(this.colorInicial());
      this.porDefecto.set(this.porDefectoInicial());
    }
  }

  onDefectoChange(nuevoValor: boolean): void {
    this.porDefecto.set(nuevoValor);

    if (this.id()) {
      this.alCambiarDefecto.emit({
        id: this.id(),
        porDefecto: nuevoValor,
      });
    }
  }

  eliminar(): void {
    if (this.id()) {
      this.alEliminar.emit(this.id()!);
    }
  }
}
