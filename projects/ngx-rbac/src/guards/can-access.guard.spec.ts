import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canAccessGuard } from './can-access.guard';

describe('canAccessGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
