import { Component, input, Input } from '@angular/core';
import { Estado } from '../../interfaces/estado.interface';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class Tag {
  estado = input<Estado>();
  titulo = input<string>();
  color = input<string>();
  estadoManual = input<boolean>(false);
}
