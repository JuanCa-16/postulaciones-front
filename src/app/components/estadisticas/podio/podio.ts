import { Component, computed, input, output } from '@angular/core';
import { RankingEstadisticaDTO } from '../../../interfaces/estadistica.interface';
import { Estado } from '../../../interfaces/estado.interface';
import { ChipGroup } from '../../chip-group/chip-group';
import { Chip } from '../../inputs/chip/chip';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Loading } from '../../loading/loading';

@Component({
  selector: 'app-podio',
  imports: [ChipGroup, Chip, ReactiveFormsModule, Loading],
  templateUrl: './podio.html',
  styleUrl: './podio.scss',
})
export class Podio {
  titulo = input.required<string>();
  datos = input<RankingEstadisticaDTO[]>([]);
  unidad = input('Postul.');
  cargando = input<boolean>(false);
  estados = input<Estado[]>([]);

  estadoSeleccionado = output<number | 'todos'>();

  filtroForm = new FormGroup({
    estadoId: new FormControl<number | 'todos'>('todos', {
      nonNullable: true,
    }),
  });

  constructor() {
    this.filtroForm.controls.estadoId.valueChanges.subscribe((estadoId) => {
      this.estadoSeleccionado.emit(estadoId);
    });
  }

  podio = computed(() => {
    const top = this.datos();
    return [1, 0, 2].filter((i) => top[i]).map((i) => ({ ...top[i], pos: i + 1 }));
  });

  resto = computed(() =>
    this.datos()
      .slice(3)
      .map((e, i) => ({ ...e, pos: i + 4 })),
  );

  estadoIdSignal = toSignal(this.filtroForm.controls.estadoId.valueChanges, {
    initialValue: 'todos',
  });

  colorPrincipal = computed(() => {
    if (this.cargando()) return;
    const estadoId = this.estadoIdSignal(); // Usamos el signal en lugar de .value directo

    if (estadoId === 'todos') {
      return 'var(--main-color)';
    }

    const estado = this.estados().find((e) => e.id === estadoId);

    return estado?.color ?? 'var(--main-color)';
  });
}
