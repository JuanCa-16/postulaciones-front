import { Component, inject, input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class InputField {
  controlName = input.required<string>();
  label = input.required<string>();
  placeholder = input<string>('');
  type = input<string>('text');
  error = input<string | null>(null);
  mostrarError = input<boolean>(false);
  autocomplete = input<string>('off');
}
