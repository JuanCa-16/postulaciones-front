import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-data',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      fill="currentColor"
    >
      <path d="M2,21V19H22v2H2Zm1-3V11H6v7H3Zm5,0V6h3V18H8Zm5,0V9h3v9H13Zm5,0V3h3V18H18Z" />
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
