import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Abilities } from '../shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { intersection } from '../shared/utils';

export type RBACstatus = 'pending' | 'loaded' | 'error';

interface rbacState {
  status: RBACstatus;
}
@Injectable({
  providedIn: 'root',
})
export class AngularRbacService {
  error$ = new Subject<any>();
  abilities$ = new Subject<Partial<Abilities>>();

  private state = signal<rbacState>({
    status: 'pending',
  });
  status = computed(() => this.state().status);

  private abilities = signal<Abilities>({ roles: [], permissions: [] });
  roles = computed(() => this.abilities().roles);
  permissions = computed(() => this.abilities().permissions);

  constructor() {
    this.abilities$.pipe(takeUntilDestroyed()).subscribe((loadedAbilities) => {
      this.state.update((state) => ({ ...state, status: 'loaded' }));
      this.abilities.update((state) => ({
        ...state,
        ...loadedAbilities,
      }));
    });
  }

  can(candidate: Partial<Abilities>): boolean {
    if (candidate.roles && candidate.roles?.length > 0) {
      const intersections = intersection(candidate.roles, this.roles());
      return intersections.length > 0;
    }
    if (candidate.permissions && candidate.permissions?.length > 0) {
      const intersections = intersection(
        candidate.permissions,
        this.permissions()
      );
      return intersections.length > 0;
    }
    return false;
  }
}
