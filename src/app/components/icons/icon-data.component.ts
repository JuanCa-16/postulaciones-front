import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-data',
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
        d="M5,21q-0.83,0-1.41-0.59T3,19V5Q3,4.17 3.59,3.59T5,3H19q0.83,0 1.41,0.59T21,5V19q0,0.82-0.59,1.41T19,21H5Zm0-2h6V5H5V19Zm8,0h6V12H13v7Zm0-9h6V5H13v5Z"
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
export class IconBuildingData {}
