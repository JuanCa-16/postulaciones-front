import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-ping',
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
        d="M4.95,17.05q-1.42-1.43-2.19-3.24T2,10T2.76,6.19T4.95,2.95l1.2,1.2Q4.98,5.32 4.34,6.84T3.7,10t0.64,3.16t1.81,2.69l-1.2,1.2Zm2.3-2.3Q6.3,13.8 5.8,12.58T5.3,10T5.8,7.43T7.25,5.25l1.2,1.2Q7.73,7.18 7.36,8.09T7,10t0.36,1.91t1.09,1.64l-1.2,1.2ZM11,21V12.3Q10.33,12 9.91,11.38T9.5,10q0-1.05 0.73-1.78T12,7.5t1.78,0.72T14.5,10q0,0.75-0.41,1.38T13,12.3V21H11Zm5.75-6.25l-1.2-1.2q0.73-0.72 1.09-1.64T17,10T16.64,8.09q-0.36-0.91-1.09-1.64l1.2-1.2Q17.7,6.2 18.2,7.43T18.7,10t-0.5,2.57t-1.45,2.18Zm2.3,2.3l-1.2-1.2q1.18-1.18 1.81-2.69T20.3,10T19.66,6.84T17.85,4.15l1.2-1.2q1.43,1.43 2.19,3.24T22,10t-0.76,3.81t-2.19,3.24Z"
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
export class IconPing {}
