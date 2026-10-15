import { Component, inject, input } from '@angular/core';
import { BgStatusService } from '../../services/bg-status-service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
protected bgStatusService = inject(BgStatusService);
}
