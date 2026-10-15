import { Component, inject, input, Input, output } from '@angular/core';
import { Tag } from '../tag/tag';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { IconBuildingComponent } from '../icons/icon-building.component';
import { IconUrlComponent } from '../icons/icon-url.component';
import { IconBriefcaseComponent } from '../icons/icon-briefcase.component';
import { IconPcComponent } from '../icons/icon-pc.component';
import { IconHouseComponent } from '../icons/icon-house.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { IconDateComponent } from '../icons/icon-date.component';
import { Router, RouterLink } from '@angular/router';
import { IconRow } from '../icons/row.component';
import { BgStatusService } from '../../services/bg-status-service';

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
    IconRow,
  ],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  protected bgStatusService = inject(BgStatusService);
  private router = inject(Router);
  postulacion = input.required<Postulacion>();

  verDetalle() {
    const item = this.postulacion();
    this.bgStatusService.setStatusColor(item.estado.color);
    this.router.navigate(['/detalles', item.id]);
  }
}
