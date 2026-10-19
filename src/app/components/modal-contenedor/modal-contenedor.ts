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

@Component({
  selector: 'app-modal-contenedor',
  templateUrl: './modal-contenedor.html',
  styleUrl: './modal-contenedor.scss',
  host: { '(document:keydown.escape)': 'cerrar()' },
})
export class ModalContenedor implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  titulo = input.required<string>();
  onCerrar = output<void>();

  cerrar() {
    this.onCerrar.emit();
  }

  ngOnInit() {
    this.renderer.appendChild(document.body, this.el.nativeElement);
    document.body.style.overflow = 'hidden'; // evita scroll del fondo
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    if (this.el.nativeElement.parentNode) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.el.nativeElement);
    }
  }
}
