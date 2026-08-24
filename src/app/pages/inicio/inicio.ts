import { Component, OnInit, signal } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { PostulacionService } from '../../services/postulacionService';
import { Postulacion } from '../../interfaces/postulacion.interface';

@Component({
  selector: 'app-inicio',
  imports: [JobCard],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  postulaciones = signal<Postulacion[]>([]);

  constructor(private postulacionService: PostulacionService) {}

  ngOnInit(): void {
    this.obtenerPostulaciones();
  }

  obtenerPostulaciones(): void {
    this.postulacionService.obtenerPostulaciones().subscribe({
      next: (response) => {
        if (!response.error) {
          this.postulaciones.set(response.data);
        }
      },
      error: (err) => {
        console.error('Error de red o servidor:', err);
      },
    });
  }
}
