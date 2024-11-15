import { TestBed } from '@angular/core/testing';

import { NgxRbacService } from './ngx-rbac.service';

describe('NgxRbacService', () => {
  let service: NgxRbacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRbacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
