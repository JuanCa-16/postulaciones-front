import {
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';
import { IconTrash } from '../icons/trash.component';

@Component({
  selector: 'app-modal',
  imports: [IconTrash],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  titulo = input.required<String>();
  subtitulo = input.required<String>();

  onConfirmar = output<boolean>();
  onCancelar = output<boolean>();

  confirmarEliminacion() {
    this.onConfirmar.emit(true);
  }
  cancelarEliminar() {
    this.onCancelar.emit(true);
  }

  ngOnInit() {
    this.renderer.appendChild(document.body, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.el.nativeElement.parentNode) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.el.nativeElement);
    }
  }
}
