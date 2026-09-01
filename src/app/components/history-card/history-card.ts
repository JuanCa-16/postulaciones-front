import { Component, input } from '@angular/core';
import { Historial } from '../../interfaces/postulacion.interface';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { IconDateComponent } from '../icons/icon-date.component';
import { Tag } from '../tag/tag';

@Component({
  selector: 'app-history-card',
  imports: [DatePipe, IconDateComponent, Tag, UpperCasePipe],
  templateUrl: './history-card.html',
  styleUrl: './history-card.scss',
})
export class HistoryCard {
  historial = input.required<Historial>();
}
