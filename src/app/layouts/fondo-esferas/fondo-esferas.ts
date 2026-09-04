import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BgStatusService } from '../../services/bg-status-service';

@Component({
  selector: 'app-fondo-esferas',
  imports: [RouterOutlet],
  templateUrl: './fondo-esferas.html',
  styleUrl: './fondo-esferas.scss',
})
export class FondoEsferas {
  protected bgStatusService = inject(BgStatusService);
}
