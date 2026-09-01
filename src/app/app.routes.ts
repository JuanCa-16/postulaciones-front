import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Detalles } from './pages/detalles/detalles';
import { CrearActualizar } from './pages/crear-actualizar/crear-actualizar';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'detalles/:id', component: Detalles },
  { path: 'agregar', component: CrearActualizar },
  {
    path: 'editar/:id',
    component: CrearActualizar,
  },
];
