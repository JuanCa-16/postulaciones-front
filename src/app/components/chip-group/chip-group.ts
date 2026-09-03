import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chip-group',
  imports: [],
  templateUrl: './chip-group.html',
  styleUrl: './chip-group.scss',
})
export class ChipGroup {
  label = input.required<string>();
  error = input<string | null>(null);
  mostrarError = input<boolean>(false);
}
