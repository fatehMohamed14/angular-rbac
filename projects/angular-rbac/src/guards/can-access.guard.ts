import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { Abilities } from '../shared/interfaces';
import { AngularRbacService } from '../lib/angular-rbac.service';

export const canAccessGuard = (candidate: Partial<Abilities>): CanMatchFn => {
  const rbacService = inject(AngularRbacService);
  return (route, segments) => {
    return rbacService.can(candidate);
  };
};
