import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-date',
  standalone: true,
  template: `
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 4.59995C0 3.46835 -3.57628e-08 2.90315 0.3516 2.55155C0.7032 2.19995 1.2684 2.19995 2.4 2.19995H9.6C10.7316 2.19995 11.2968 2.19995 11.6484 2.55155C12 2.90315 12 3.46835 12 4.59995C12 4.88255 12 5.02415 11.9124 5.11235C11.8242 5.19995 11.682 5.19995 11.4 5.19995H0.6C0.3174 5.19995 0.1758 5.19995 0.0875999 5.11235C-5.36442e-08 5.02415 0 4.88195 0 4.59995ZM0 9.99995C0 11.1316 -3.57628e-08 11.6968 0.3516 12.0484C0.7032 12.4 1.2684 12.4 2.4 12.4H9.6C10.7316 12.4 11.2968 12.4 11.6484 12.0484C12 11.6968 12 11.1316 12 9.99995V6.99995C12 6.71735 12 6.57575 11.9124 6.48755C11.8242 6.39995 11.682 6.39995 11.4 6.39995H0.6C0.3174 6.39995 0.1758 6.39995 0.0875999 6.48755C-5.36442e-08 6.57575 0 6.71795 0 6.99995V9.99995Z"
        fill="currentColor"
      />
      <path d="M3 1V2.8M9 1V2.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class IconDateComponent {}
