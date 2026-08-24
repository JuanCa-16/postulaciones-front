import { Component, Input } from '@angular/core';
import { Estado } from '../../interfaces/estado.interface ';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class Tag {
  @Input({ required: true }) estado!: Estado;
}
