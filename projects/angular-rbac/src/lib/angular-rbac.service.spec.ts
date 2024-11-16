import { TestBed } from '@angular/core/testing';
import { AngularRbacService } from './angular-rbac.service';

describe('AngularRbacService', () => {
  let service: AngularRbacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularRbacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
