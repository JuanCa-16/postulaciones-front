import { Component, inject, input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Estado } from '../../../interfaces/estado.interface';

@Component({
  selector: 'app-chip',
  imports: [ReactiveFormsModule],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  viewProviders: [
    {
      provide: ControlContainer, // 1. Buscamos el contenedor de formularios
      useFactory: () => inject(ControlContainer, { skipSelf: true }), // 2. Omitimos nuestro propio nivel ({ skipSelf: true }) y tomamos el formulario del padre
    },
  ],
})
export class Chip {
  controlName = input.required<string>();
  value = input<string>();
  label = input<string>();
  estado = input<Estado>();
}
