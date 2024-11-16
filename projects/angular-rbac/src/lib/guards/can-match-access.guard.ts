import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Abilities } from '../../shared/interfaces';
import { AngularRbacService } from '../angular-rbac.service';

// this will redirect to a not found route if is not loaded
export const canMatchAccessGuard = (
  candidate: Partial<Abilities>
): CanMatchFn => {
  return (route, segments) => {
    const rbacService = inject(AngularRbacService);
    return rbacService.can(candidate);
  };
};
