import { Component, input } from '@angular/core';

@Component({
  selector: 'app-data-field',
  imports: [],
  templateUrl: './data-field.html',
  styleUrl: './data-field.scss',
  host: {
    '[class.dato-full]': 'fullWidth()',
  },
})
export class DataField {
  label = input.required<string>();
  value = input<string | number | null | undefined>(null);
  url = input<string | null | undefined>(null);
  badge = input<boolean>(false);
  fullWidth = input<boolean>(false);
}
