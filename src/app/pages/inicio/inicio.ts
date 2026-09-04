import { Component, inject, OnInit, signal } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { PostulacionService } from '../../services/postulacionService';
import { Postulacion } from '../../interfaces/postulacion.interface';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { Router, RouterLink } from '@angular/router';
import { IconGear } from '../../components/icons/gear.component';
import { IconPlus } from '../../components/icons/plus.component';
import { IconRow } from '../../components/icons/row.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inicio',
  imports: [JobCard, Loading, RouterLink, IconGear, IconPlus, IconRow],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  private readonly postulacionService = inject(PostulacionService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  postulaciones = signal<Postulacion[]>([]);
  cargando = signal(false);

  ngOnInit(): void {
    this.obtenerPostulaciones();
  }

  obtenerPostulaciones(): void {
    this.cargando.set(true);

    this.postulacionService
      .obtenerPostulaciones()
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        }),
      )
      .subscribe({
        next: (postulaciones) => {
          this.postulaciones.set(postulaciones);
        },

        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.message ?? 'Error al ingresar', 'Error');
        },
      });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
