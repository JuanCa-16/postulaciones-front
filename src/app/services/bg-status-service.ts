import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BgStatusService {
  readonly statusColor = signal<string | null>(null);

  setStatusColor(color: string | null) {
    this.statusColor.set(color);
  }
}
