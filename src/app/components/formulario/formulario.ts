import { Component, input, effect, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estado } from '../../interfaces/estado.interface';
import { CrearPostulacion, Modalidad, Postulacion } from '../../interfaces/postulacion.interface';
import { Chip } from '../inputs/chip/chip';
import { ChipGroup } from '../chip-group/chip-group';
import { InputField } from '../inputs/input-field/input-field';
import { Header } from '../header/header';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, Chip, ChipGroup, InputField, Header],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  estados = input.required<Estado[]>();
  postulacion = input<Postulacion | null>(null);

  crear = output<CrearPostulacion>();
  editar = output<CrearPostulacion>();

  formulario = new FormGroup({
    nombreOferta: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nombreEmpresa: new FormControl(''),
    url: new FormControl(''),
    paginaAplicacion: new FormControl(''),
    modalidad: new FormControl<Modalidad>(Modalidad.REMOTO, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    estadoId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      const estados = this.estados();
      const postulacion = this.postulacion();

      if (postulacion) {
        this.formulario.patchValue({
          nombreOferta: postulacion.nombreOferta,
          nombreEmpresa: postulacion.nombreEmpresa,
          url: postulacion.url,
          paginaAplicacion: postulacion.paginaAplicacion,
          modalidad: postulacion.modalidad,
          estadoId: postulacion.estado.id,
        });

        return;
      }

      const estadoPorDefecto = estados.find((estado) => estado.porDefecto);

      if (estadoPorDefecto) {
        this.formulario.controls.estadoId.setValue(estadoPorDefecto.id);
      }
    });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();

    if (this.postulacion()) {
      this.editar.emit(datos);
    } else {
      this.crear.emit(datos);
    }
  }

  protected esCampoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
