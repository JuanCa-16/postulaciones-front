import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Detalles } from './pages/detalles/detalles';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'detalles/:id', component: Detalles },
];
