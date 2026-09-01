import { Component, input, Input, output } from '@angular/core';
import { Tag } from '../tag/tag';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { IconBuildingComponent } from '../icons/icon-building.component';
import { IconUrlComponent } from '../icons/icon-url.component';
import { IconBriefcaseComponent } from '../icons/icon-briefcase.component';
import { IconPcComponent } from '../icons/icon-pc.component';
import { IconHouseComponent } from '../icons/icon-house.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { IconDateComponent } from '../icons/icon-date.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-card',
  imports: [
    Tag,
    IconBuildingComponent,
    IconUrlComponent,
    IconBriefcaseComponent,
    IconPcComponent,
    IconHouseComponent,
    IconDateComponent,
    TitleCasePipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  postulacion = input.required<Postulacion>();
  eliminar = output<number>();

  eliminarPostulacion(): void {
    this.eliminar.emit(this.postulacion().id);
  }
}
