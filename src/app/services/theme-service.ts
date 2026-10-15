// services/theme-service.ts
import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'theme';
const CLASE_OSCURO = 'dark-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly _oscuro = signal(this.leerInicial());

  readonly oscuro = this._oscuro.asReadonly();

  constructor() {
    this.aplicarClase(this._oscuro());
  }

  toggle(): void {
    const nuevo = !this._oscuro();
    this._oscuro.set(nuevo);
    this.aplicarClase(nuevo);

    try {
      localStorage.setItem(STORAGE_KEY, nuevo ? 'dark' : 'light');
    } catch {
      // almacenamiento no disponible (modo privado, etc.)
    }
  }

  private aplicarClase(oscuro: boolean): void {
    this.document.documentElement.classList.toggle(CLASE_OSCURO, oscuro);
  }

  private leerInicial(): boolean {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) return guardado === 'dark';
    } catch {
      // ignorar
    }
    return this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }
}
