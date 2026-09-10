import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const demo = localStorage.getItem('authMode') === 'demo';

  if (token || demo) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
