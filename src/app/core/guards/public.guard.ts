import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return true; // No hay sesión, permite entrar al login
  }

  router.navigate(['/']); // Ya hay sesión, manda al inicio
  return false;
};
