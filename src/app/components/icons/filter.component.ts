import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-filter',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="1rem"
      width="1rem"
      fill="currentColor"
    >
      <path
        d="M11,20q-0.42,0-0.71-0.29Q10,19.43 10,19V13L4.2,5.6Q3.83,5.1 4.09,4.55T5,4H19q0.65,0 0.91,0.55T19.8,5.6L14,13v6q0,0.43-0.29,0.71T13,20H11Zm1-7.7L16.95,6H7.05L12,12.3Zm0,0Z"
      />
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
export class IconFilter {}
