import { Component, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { InputField } from '../../components/inputs/input-field/input-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Loading } from '../../components/loading/loading';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [Header, InputField, ReactiveFormsModule, Loading],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly userService = inject(UsuarioService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  cargando = signal(false);

  formulario = new FormGroup({
    usuario: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    clave: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();
    this.cargando.set(true);

    this.userService
      .login({ correo: datos.usuario, clave: datos.clave })
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta.token) {
            localStorage.setItem('token', respuesta.token);
          }

          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al ingresar', 'Error');
        },
      });
  }

  protected esCampoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
