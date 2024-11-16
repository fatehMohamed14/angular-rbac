import { inject } from '@angular/core';
import { CanActivateChildFn, Router, UrlTree } from '@angular/router';

import { Abilities } from '../../shared/interfaces';
import { AngularRbacService } from '../angular-rbac.service';

export const canActivateChildAccessGuard = (
  candidate: Partial<Abilities>,
  redirectUrl?: string,
  skipLocationChange?: boolean
): CanActivateChildFn => {
  return (route, segments) => {
    const router: Router = inject(Router);
    const rbacService = inject(AngularRbacService);
    if (!redirectUrl) return rbacService.can(candidate);
    if (rbacService.can(candidate)) {
      return true;
    } else {
      if (skipLocationChange) {
        router.navigate([redirectUrl], { skipLocationChange: true });
        return false;
      } else {
        const urlTree: UrlTree = router.parseUrl(redirectUrl);
        return urlTree;
      }
    }
  };
};
