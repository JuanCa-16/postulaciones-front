import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  // 1. Ruta principal del dashboard / lista de postulaciones
  {
    path: '',
    component: Inicio,
    pathMatch: 'full',
    canActivate: [authGuard],
  },

  // 2. Rutas que comparten el layout 'fondo-esferas'
  {
    path: '',
    loadComponent: () =>
      import('./layouts/fondo-esferas/fondo-esferas').then((m) => m.FondoEsferas),
    children: [
      // Ruta pública: Solo accesible si NO está autenticado
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
        canActivate: [publicGuard],
      },
      // Rutas privadas dentro del layout
      {
        path: 'agregar',
        loadComponent: () =>
          import('./pages/crear-actualizar/crear-actualizar').then((m) => m.CrearActualizar),
        canActivate: [authGuard],
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./pages/crear-actualizar/crear-actualizar').then((m) => m.CrearActualizar),
        canActivate: [authGuard],
      },
      {
        path: 'estados',
        loadComponent: () => import('./pages/estados/estados').then((m) => m.Estados),
        canActivate: [authGuard],
      },
    ],
  },

  // 3. Detalle individual
  {
    path: 'detalles/:id',
    loadComponent: () => import('./pages/detalles/detalles').then((m) => m.Detalles),
    canActivate: [authGuard],
  },

  // 4. Wildcard: Redirige al inicio (si está logueado irá a '', si no, authGuard lo manda a /login)
  {
    path: '**',
    redirectTo: '',
  },
];