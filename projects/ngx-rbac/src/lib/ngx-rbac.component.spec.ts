import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRbacComponent } from './ngx-rbac.component';

describe('NgxRbacComponent', () => {
  let component: NgxRbacComponent;
  let fixture: ComponentFixture<NgxRbacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxRbacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxRbacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
