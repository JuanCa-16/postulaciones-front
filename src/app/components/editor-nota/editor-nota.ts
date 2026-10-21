import { Component, effect, inject, input, output, signal } from '@angular/core';
import { InputField } from '../inputs/input-field/input-field';
import { Nota } from '../../interfaces/nota.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotasService } from '../../services/notas-service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Loading } from '../loading/loading';
import { IconUserComponent } from '../icons/icon-user.component';
import { IconLocationComponent } from '../icons/icon-location.component';
import { IconMoneyComponent } from '../icons/icon-money.component';
import { IconClockComponent } from '../icons/icon-clock.component';
import { IconContractComponent } from '../icons/icon-contract.component';
import { DemoService } from '../../services/demo-service';

@Component({
  selector: 'app-editor-nota',
  imports: [
    ReactiveFormsModule,
    InputField,
    Loading,
    IconUserComponent,
    IconLocationComponent,
    IconMoneyComponent,
    IconClockComponent,
    IconContractComponent,
  ],
  templateUrl: './editor-nota.html',
  styleUrl: './editor-nota.scss',
})
export class EditorNota {
  idPostulacion = input.required<number>();
  nota = input.required<Nota | null>();
  responseNota = output<Nota | null>();
  cargando = signal(false);
  private readonly notaService = inject(NotasService);
  private readonly toastr = inject(ToastrService);
  protected readonly demoService = inject(DemoService);

  formulario = new FormGroup({
    reclutador: new FormControl(''),
    salario: new FormControl(''),
    ubicacion: new FormControl(''),
    horario: new FormControl(''),
    tipoContrato: new FormControl(''),
    otros: new FormControl(''),
  });

  constructor() {
    effect(() => {
      const nota = this.nota();

      if (nota) {
        this.formulario.patchValue({
          reclutador: nota.reclutador,
          salario: nota.salario,
          ubicacion: nota.ubicacion,
          horario: nota.horario,
          tipoContrato: nota.tipoContrato,
          otros: nota.otros,
        });

        return;
      }
    });
  }

  guardar(): void {
    if (this.demoService.estaEnModoDemo()) {
      this.toastr.warning('No se permite en modo DEMO', 'Advertencia');
      return;
    }
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();

    // Eliminar espacios al inicio y al final
    datos.reclutador = datos.reclutador?.trim() || null;
    datos.salario = datos.salario?.trim() || null;
    datos.ubicacion = datos.ubicacion?.trim() || null;
    datos.horario = datos.horario?.trim() || null;
    datos.tipoContrato = datos.tipoContrato?.trim() || null;

    // Limpiar espacios y saltos de línea excesivos
    datos.otros = this.limpiarTexto(datos.otros ?? '') || null;

    this.cargando.set(true);

    this.notaService
      .guardarNota(this.idPostulacion(), datos)
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.formulario.patchValue({
              reclutador: respuesta.reclutador,
              salario: respuesta.salario,
              ubicacion: respuesta.ubicacion,
              horario: respuesta.horario,
              tipoContrato: respuesta.tipoContrato,
              otros: respuesta.otros,
            });
            this.responseNota.emit(respuesta);
            this.toastr.success('Guardado Correctamente', 'Exitoso');
          } else {
            this.responseNota.emit(null);
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al Guardar', 'Error');
        },
      });
  }

  protected esCampoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  private limpiarTexto(texto: string): string {
    return texto
      .replace(/\r\n?/g, '\n')
      .split('\n')
      .map((linea) => linea.trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}
