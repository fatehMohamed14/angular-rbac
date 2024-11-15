import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { NgxRbacService } from '../lib/ngx-rbac.service';
import { Abilities } from '../shared/interfaces';

export const canAccessGuard = (candidate: Partial<Abilities>): CanMatchFn => {
  const rbacService = inject(NgxRbacService);
  return (route, segments) => {
    return rbacService.can(candidate);
  };
};
