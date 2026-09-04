import { Component, input } from '@angular/core';
import { IconRow } from '../icons/row.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [IconRow, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  titulo = input.required<String>();
  subtitulo = input.required<String>();
  url = input<string>();
}
