import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sin-registros',
  imports: [],
  templateUrl: './sin-registros.html',
  styleUrl: './sin-registros.scss',
})
export class SinRegistros {
  title = input<string>('No encontramos postulaciones');
  description = input<string>(
    'Parece que no hay resultados que coincidan con tu búsqueda actual o tus filtros.',
  );
}
